//client http learn code
var http = require("http")
var opts={
	host:"www.imooc.com",
	port:80,
	path:"/",
	method:"Get"
}
var req = http.request(opts , function (res) {
	// console.log(res)
	res.setEncoding("utf8")
	res.on("data" , function (data) {
		console.log(data)
	})
})

req.end();