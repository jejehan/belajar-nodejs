var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var nav = [
    {
        link: '/blogs',
        text: 'Blogs'
    },
    {
        link: '/potofolio',
        text: 'Portofolio'
    },
    {
        link: '/auth/signin',
        text: 'Sign In'
    },
    {
        link: '/auth/signup',
        text: 'Sign Up'
    },{
        link: '/auth/logout',
        text: 'logout'
    }
];


//router
var blogsRouter = require('./src/routes/blogsRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret:'myblogs',
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport')(app);

//app.use(express.static('src/views'));
app.set('views','./src/views');
//app.set('view engine','jade');

//var handlebars = require('express-handlebars');
//app.engine('.hbs',handlebars({extname: '.hbs'}));
//app.set('view engine','.hbs');

app.set('view engine','ejs');

app.use('/blogs', blogsRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);


app.get('/', function (req, res) {
    res.render('index',{
        title:'Start Bootstrap EJS',
        nav:nav
    });
});

app.listen(port, function () {
    console.log('example listening  on port ' + port);
});
