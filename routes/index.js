var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
var User = mongoose.model('myusers', { email: String, password: String});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{ title: 'Express' });
});
router.post('/signedup', function(req, res){
    var email = req.body.email;
    var pwd = req.body.password;

    var newUser = new User({ email: email, password: pwd});
    newUser.save(function (err) {
        if (err) {
            console.log(err);
            res.json( { error: err });

        } else {
            res.render("signedup");
            //console.log('new user');
        }
    });

});

router.post('/welcome', function(req, res){
    var email = req.body.email;
    var pwd = req.body.password;
    User.findOne({email: email, password: pwd},function(err, user){
            if(user){
                res.render('welcome');
            }else{
                res.redirect('/');
            }
        })
});


module.exports = router;
