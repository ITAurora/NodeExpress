//post请求
app.post("/register", (req, res) => {
	var userName = req.body.userName
	var passWord = req.body.passWord
	if (!userName || !passWord) {
		res.send({
			code: 0,
			msg: "用户名与密码为必传参数...",
		})
		return
	}
	if (userName && passWord) {
		const result = `SELECT * FROM user WHERE userName = '${userName}'`
		conn.query(result, [userName], (err, results) => {
			if (err) throw err
			if (results.length >= 1) {
				//2、如果有相同用户名，则注册失败，用户名重复
				res.send({ code: 0, msg: "注册失败，用户名重复" })
			} else {
				const sqlStr = "insert into user(userName,passWord) values(?,?)"
				conn.query(sqlStr, [userName, passWord], (err, results) => {
					if (err) throw err
					if (results.affectedRows === 1) {
						res.send({ code: 1, msg: "注册成功" })
					} else {
						res.send({ code: 0, msg: "注册失败" })
					}
				})
			}
		})
	}
 
	console.log("接收", req.body)
})