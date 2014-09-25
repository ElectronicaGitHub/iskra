var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./configs/mongoose');
var log = require('./configs/logger')(module);
var config = require('./configs/config_file');
var favicon = require('serve-favicon');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var users = require('./routes/users');

var app = express();
var session = require('express-session');

mongoose.connection.on('open', function () {
    log.info('connected to database ' + config.get('db:name'));
});
    
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('env', 'production');
app.set('views', path.join(__dirname, app.get('env') == 'production' ? 'views/build' : 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/images/tk_site_avatar.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat'}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (
    function(username, password, done) {
        if (username != config.get('autentification:username')) {
            return done(null, false, { message : 'Wrong Username'})
        }
        if (password != config.get('autentification:password')) {
            return done(null, false, { message : 'Wrong Password'})
        }
        user = {
            name : 'Gendalf',
            id : 88162440
        };
        return done(null, user);
    })
)
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    done(null, user);
});

// ОПРЕДЕЛЕНИЕ РУТОВ
// app.get('/auth', function(req, res, next) {
//     res.render('auth');
// });
app.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/admin' 
}));

app.use('/', require('./routes/index.js')(express));
app.use('/admin', require('./routes/admin.js')(express, config));
// app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.log(err)
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err)
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(8080);    
console.log('Magic happens on port 8080'); 
