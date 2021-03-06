var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var processRouter = require('./routes/process');
var cleaningRouter = require('./routes/cleaning');
var layerRouter = require('./routes/layer');
var gasRouter = require('./routes/gas');
var equipmentRouter = require('./routes/equipment');
var ajaxRouter = require('./routes/ajax');


//var usersRouter = require('./routes/users');
//const db = require('./models');
//db.sequelize.sync();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'node_modules/bootstrap/dist')))
app.use(express.static(path.join(__dirname,'node_modules/jquery/dist')))
app.use('/cleaning', cleaningRouter);
app.use('/layer', layerRouter);
app.use('/gas', gasRouter);
app.use('/process', processRouter);
app.use('/equipment', equipmentRouter);
app.use('/ajax', ajaxRouter);

app.use('/', indexRouter); // всегда последний маршрут
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen('8082');
module.exports = app;
