var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //fungsi dafter
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        //asychronus
        //http://howtonode.org/understanding-process-next-tick
        process.nextTick(function() {

            User.findOne({
                'local.email': email
            }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    //cek jika user ada maka tampilkan pesan error
                    return done(null, false, req.flash({
                        'signupMessage': 'Email sudah terdaftar'
                    }));

                } else {
                    var newUser = User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); //acak password pake bcrypt-nodejs

                    //simpan data didalam database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });

                }
            });
        });
    }));

    //fungsi login
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        User.findOne({
            'local.email': email
        }, function(err, user) {
            if (err)
                return done(err);

            //cek jika tidak ada usernya dan jika passowdnya tidak benar
            if (!user && !user.validPassword(password))
                return done(null, false, req.flash('signinMessage', 'Email atau passowd anda salah!'));

            return done(null, user);

        });

    }));
};
