var passport = require('passport'),
    LocalStrategy =  require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function(){
        passport.use(new LocalStrategy({
            usernameField:'email',
            passwordField:'password'
        },function(username,password,done){

            var url = 'mongodb://localhost:27017/BelajarNodeDB';
            mongodb.connect(url,function(err, db){
                var collection = db.collection('user');
                collection.findOne({email:username},function(err,results){
                    if(results){
                        if(results.password === password){
                            console.log('user login');
                            var user = {
                                username:username,
                                password:password,
                            };
                            done(null,user);
                        }else{
                            console.log('user not authorize');
                            done(null,false);
                        }
                    }else{
                        done(null,false);
                    }
                    console.log(results);
                });
            });



        }));
};
