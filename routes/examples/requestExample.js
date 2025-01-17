const express = require('express')

//创建服务器
const app = express.Router()

//请求处理
app.get("/index",(req,res) => {
  res.send("欢迎来到德莱联盟")
})

//参数的获取:

//get参数的获取，localhost:3000/main?name=zs
app.get("/main",(req,res) => {//localhost:3000/main?name=zs
  // 设置头部信息，如跨域
  // res.header()
  console.log(req.query)
  // res.send("欢迎"+req.query.name+"来到德莱联盟")
  res.send(req.query)
})

//post请求参数的获取：借助body-parser
app.post("/home",(req,res) => {
  console.log(req.body)
  res.send(req.body)
})


//路由参数获取：localhost:3000/route/123/tom
app.get("/route/:id/:name",(req,res) => {
  console.log(req.params)// {"id": "123","name": "tom"}
  res.send(req.params)
})

module.exports = app
