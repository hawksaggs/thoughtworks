var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var routes = require('./routes/index');
var multer = require('multer');
var app = express();

// view engine setup
console.log( path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.create({
  defaultLayout: 'main',
  layoutsDir: app.get('views')+'/layouts',
  partialsDir: [app.get('views') + '/partials'],
}).engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer({dest:path.join(__dirname, 'public/upload/temp')}).single('file'));
app.use('/public/',express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
