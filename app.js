var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongosesh = require('connect-mongodb-session')(session);
var mongodb = require('mongodb');
var details = require('./package.json');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.version = details.version;

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser("sVqLFDh3dNVlfR2"));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "sVqLFDh3dNVlfR2",
	store: new mongosesh({
		uri: 'mongodb://localhost:27017/sessions',
		collection: 'resume'
	}),
	cookie: {maxAge: 60000*60*24*7, secure: true}
}));
app.use(function(req, res, next) {
	if (req.session.username) {
		res.locals.sessionData = req.session;
		next();
	} else {
		next();
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

module.exports = app;
