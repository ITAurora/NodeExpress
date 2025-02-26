var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var config=require('./dataBase/config');
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
app.use('/middlewareDemo',middlewareDemoRouter)

//导入请求示例
var requestExampleRouter= require('./routes/examples/requestExample')
app.use('/requestExample',requestExampleRouter) ;

//导入post请求模块
const bodyParser = require('body-parser');
// 拦截所有请求
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
// 建议使用false
app.use(bodyParser.urlencoded({extended: false}));


//导入请求数据库数据示例
var testdbRouter= require('./dataBase/testdb')
app.use('/testdb',testdbRouter) ;

//请求数据库数据
var dataExampleRouter= require('./routes/examples/dataExample')
app.use('/dataExample',dataExampleRouter) ;




//解决跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})
//------------------------------------------------------------------------------------------------------
var loginRouter = require('./routes/login');
app.use('/src',loginRouter) ;
var registerRouter = require('./routes/register');
app.use('/src',registerRouter) ;
//-------------------------------------------------------------------------------------------------------
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

// express 服务启动端口
process.env.PORT = 3000;

module.exports = app;
