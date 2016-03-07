var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav){
    authRouter.route('/signin').get(function(req, res){
        res.render('signin',{
            title:'Start Bootstrap Sign in',
            nav:nav,
        });
    }).post(passport.authenticate('local',{
        failureRedirect: '/'
    }),function(req, res){
        res.redirect('/auth/profile');
    });

    authRouter.route('/signup').get(function(req, res){
        res.render('signup',{
            title:'Start Bootstrap Sign up',
            nav:nav,
        });
    }).post(function(req,res){

        var url = 'mongodb://localhost:27017/BelajarNodeDB';
        mongodb.connect(url,function (err, db){
            var collection = db.collection('user');
            var user = {
                fistname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                month: req.body.month,
                day: req.body.day,
                year: req.body.year,
                gender:req.body.gender,
            };

            collection.insert(user, function(err, results){
                req.login(results.ops[0], function(){
                    res.redirect('/auth/profile');
                });
            });
        });
    });

    authRouter.route('/profile')
    .all(function(req,res,next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    })
    .get(function(req,res){
        res.json(req.user);
    });

    authRouter.route('/logout')
    .get(function(req,res){
        delete req.session.user;
        res.redirect('/');
    });

    return authRouter;
};

module.exports = router;
