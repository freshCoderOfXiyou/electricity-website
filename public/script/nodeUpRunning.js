// 创建聊天服务器
// 加载net模块，这个模块包含所有tcp需要的功能
var net = require("net")
// 创建一个TCP服务器
var chatserver = net.createServer()

// 调用on方法做事件监听器
chatserver.on("connection" , function (client) {
	// 发送信息给客户端
	client.write("hi\n")
	client.write("bey\n")

	client.on("data" , function (data) {
		console.log(data)
	})

	// 关闭连接，没有参数，如果有参数也会将参数传递给客户端	
	client.end()
})

chatserver.listen(9000)

