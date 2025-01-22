
const express = require('express')

//创建服务器
const app = express.Router()
const conn= require('../dataBase/db')
var jwt = require("jsonwebtoken")

app.post("/login", (req, res) => {
	var userName = req.body.userName
	var passWord = req.body.passWord
	console.log(userName,passWord);
	if (!userName || !passWord) {
		res.send({
			code: 0,
			msg: "用户名与密码为必传参数...",
		})
		return
	}
	const sqlStr = "select * from user WHERE userName=? AND passWord=?"
	conn.query(sqlStr, [userName, passWord], (err, result) => {
		if (err) throw err
		if (result.length > 0) {
			// 生成token
			var token = jwt.sign(
				{
					identity: result[0].identity,
					userName: result[0].userName,
				},
				"secret",
				{ expiresIn: "1h" },
			)
			console.log(token)
			res.send({ code: 1, msg: "登录成功", token: token })
 
			// 如果没有登录成功，则返回登录失败
		} else {
			// 判断token
			if (req.headers.authorization == undefined || req.headers.authorization == null) {
				if (req.headers.authorization) {
					var token = req.headers.authorization.split(" ")[1] // 获取token
				}
				jwt.verify(token, "secret", (err, decode) => {
					if (err) {
						res.send({ code: 0, msg: "登录失败" })
					}
				})
			}
		}
	})
})

module.exports = app;