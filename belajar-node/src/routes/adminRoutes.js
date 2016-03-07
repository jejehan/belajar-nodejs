var express = require('express');
var adminRouter  = express.Router();
var mongodb = require('mongodb').MongoClient;

var blogs = [
    {
        title:'Pengalaman belajar nodejs dengan express js 4',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar Yii 2 PHP Framework ',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar Laravel 5 ',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar Ruby on Rails',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar python',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar angular',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar ReactJs ',
        body:'You ought to be ashamed of yourself',
    },
    {
        title:'Pengalaman belajar MeteorJs',
        body:'You ought to be ashamed of yourself',
    },
];

adminRouter.route('/addBlog')
.get(function(req,res){
    var url = 'mongodb://localhost:27017/BelajarNodeDB';
    mongodb.connect(url, function(err, db){
        var collection = db.collection('blog');
        collection.insertMany(blogs, function (err, results) {
            res.send(results);
            db.close();
        });
    });
});

module.exports = adminRouter;
