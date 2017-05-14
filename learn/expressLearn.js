//@express API学习文档
var express = require("express")
var bodyParser = require("body-parser")
// var serveStatic=require('serve-static')
// var _dirname = "/home/jyy/workspace/electricity-website"
var app = express()

//add router
var router = require("./part")
app.use("/main" , router)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/module" , require("./module.js"))

app.get("/" , function(req , res){
	res.sendFile("/home/jyy/workspace/electricity-website/finger.html")
	console.log(req.ip)
	console.log(req.query)
})

app.get("/param/:user" , function (req ,res) {
	res.send(req.baseUrl + "user:" + req.params.user)
	//successful get param , even the param is chinese
	//the most important is ":" signal 
})

app.post("/a",function (req , res) {
	console.log(req.body)
	res.send("the page has been handle:"+ req.body + req.params)
})

app.listen(1027 , function(err){
	if (err) {
		console.log(err)
	}
	else{
		console.log("success start at port 1027")
	}

})

