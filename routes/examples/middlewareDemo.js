//demo.js

//导入express模块
const express = require('express')
//创建服务器
const app = express.Router()
const fs = require('fs')

//处理全部请求
app.use((req,res,next)=>{
  console.log('全局请求走了')
  next()
})


//处理get_data请求
//定义中间件
app.get("/get_data",(req,res,next) => {
  req.name = '张三'
  next(); //向下执行
})
app.get("/get_data",(req,res) => {
  res.send(req.name)
})
  

//处理index请求
//项目中没有demo.txt文件，会出现错误
app.get('/index',(req,res,next) => {
  fs.readFile("./demo.text",'utf8',(err,result) => {
    if(err != null){
      //文件读取失败，向下传递错误对象
      next(err)
    }else{
      res.send(result)
    }
  })
})

//try catch可以捕获异步函数和同步代码执行过程中发生的错误，但是不能捕获“回调函数的错误”，“promise对象的错误” 如下
// app.get("/demo",async (req,res,next) => {
//   try{
//     await fs.readFile('./demo.js')
//   } catch(ex) {
//     console.log(ex)
//     //传递错误信息
//     next(ex)
//   }
// })
module.exports = app