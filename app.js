var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//导入demo中间件模块
var middlewareDemoRouter = require('./routes/examples/middlewareDemo')
//第一个参数，请求名称，第二个参数，路由模板
app.use('/middlewareDemo',middlewareDemoRouter) //  localhost:3000/demo

var requestExampleRouter= require('./routes/examples/requestExample')
app.use('/requestExample',requestExampleRouter) ;

//导入post请求模块
var express = require('express');
const bodyParser = require('body-parser');

// 拦截所有请求
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
// 建议使用false
app.use(bodyParser.urlencoded({extended: false}));



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
module.exports = app;
