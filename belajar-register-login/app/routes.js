module.exports = function (app,passport){

    //index
    app.get('/',function (req,res){
        res.render('index');
    } );

    //GET signup
    app.get('/signup',function (req,res){
        res.render('signup',{ message : req.flash('signupMessage') });
    } );

    //POST signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash    : true
    }));

    //GET sign in
    app.get('/signin',function (req,res){
        res.render('signin',{ message : req.flash('signinMessage') });
    } );

    //POST signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect : '/profile',
        failureRedirect : '/signin',
        failureFlash    : true
    }));

    //GET profile
    app.get('/profile',function (req,res){
        if(req.user){
            res.render('profile',{ user : req.user });
        }else{
            res.redirect('/');
        }
    } );

    //GET logout
    app.get('/logout',function (req,res){
        req.logout();
        res.redirect('/');
    });

};

//cek apakah user sudah login
function isLogin(req, res, next){

    //jika user udah login
    if(req.isAuthenticated())
        return next();

    // jika belum login
    res.redirect('/');

}
