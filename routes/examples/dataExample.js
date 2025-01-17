//data.js
// 记得在app.js中配置


const express = require('express')

//创建服务器
const app = express.Router()

const {getAccount,insertAccount,updateAccount,deleteAccount} = require('../../dataBase/api')

app.get("/get_account",(req,res,next) => {
  getAccount()
  .then(response => {
    res.send(response)
  })
})

app.post("/insert_account",(req,res,next) => {
  let param = req.body
  let {username,phone,password} = param
  insertAccount([username,phone,password])
  .then(response => {
    res.send(response)
  })
})

app.post("/update_account",(req,res,next) => {
  let param = req.body
  let {username,phone} = param
  updateAccount([username,phone])
  .then(response => {
    res.send(response)
  })
})

app.get("/delete_account",(req,res,next) => {
  let id = req.query.id
  deleteAccount([id])
  .then(response => {
    res.send(response)
  })
})

module.exports = app
