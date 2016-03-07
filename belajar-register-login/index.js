var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

var configDb    = require('./config/database');

mongoose.connect(configDb.url);

require('./config/passport')(passport);

//seting untuk aplikasi
app.use(express.static('public'));  // untuk memberitahukan kalau file asset ada di folder public
app.use(morgan('dev'));             // untuk membuat log disetiap request ke console
app.use(cookieParser());            // untuk membaca cookie dibutuhkan pada saat authentikasi
app.use(bodyParser());              // untuk membaca informasi dari html form

//seting untuk engine template
app.set('view engine','ejs'); //engine template yang akan digunakan

//setting untuk passport
//http://passportjs.org/docs/configure
app.use(session({ secret:'belajarnodejs2016!' })); // secret digunakan untuk ke
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//load file routes.js
require('./app/routes.js')(app,passport);

app.listen(port, function () {
    console.log('Start on port : ' + port);
});
