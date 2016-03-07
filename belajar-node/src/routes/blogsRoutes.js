var express = require('express');
var blogsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectID =  require('mongodb').ObjectID;

var router = function(nav){

    blogsRouter.route('/')
            .get(function(req,res){
                var url = 'mongodb://localhost:27017/BelajarNodeDB';
                mongodb.connect(url,function(err,db){
                    var collection = db.collection('blog');
                    collection.find({}).toArray(function(err, results){
                        res.render('blogs',{
                            title:'Start Bootstrap Blogs',
                            nav:nav,
                            blogs:results,
                        });
                    });
                });
            });

    blogsRouter.route('/:id')
            .get(function(req,res){
                var id = new ObjectID(req.params.id);
                var url = 'mongodb://localhost:27017/BelajarNodeDB';
                mongodb.connect(url,function(err, db){
                    var collection = db.collection('blog');
                    collection.findOne({_id:id},function(err, result){
                        res.render('blogView',{
                            title:'Start Bootstrap Blogs',
                            nav:nav,
                            blog:result,
                        });
                    });
                });

            });

    return blogsRouter;
};


module.exports = router;
