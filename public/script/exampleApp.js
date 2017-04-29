// this a example js 
var express = require("express")

//引入对请求body的处理
var bodyParser = require("body-parser")
var router = require("./routes/index")
var user = require("./routes/users")
var app = express()

//视图引擎设置
app.set("views" , path.join(__dirname , "views"))
app.set("view engine" , "ejs")

//设置express支持json串的处理
app.use(bodyParser.json())
//支持通过post方法获取body里面的值
app.use(bodyParser.urlencoded({extended:true}))


//当输入地址为/ship时，交给shipSearch路由程序进行处理
app.use("/ship" , shipSearch)
app.use("/index" , routes)
app.use("/users" , users)
//404 and err handle
// .....

moudle.exports = app
