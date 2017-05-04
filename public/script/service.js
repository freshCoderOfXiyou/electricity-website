// 处理get、post、put、delete请求的接口，分别对应查、改、增、删的数据库操作
var express = require("express")
var router = express.Router()

// 引入mongodb模块
var mongodb = require("mongodb").MongoClient
var url = "mongodb://localhost:27017/ship"
router.get("/ship" , function (req , res , next) {//处理get查询
	console.log(req.body.col) //collection name
	console.log(req.body.docs) //条件语句
	var size = req.body["size"] //return the number of collection
	//parse string into json ,return null when fail , null is default value
	var docs = {}
	if (req.body.docs) {
		try{
			docs = eval("(" + req.body.docs + ")") // parse string into object

		}catch(e){
			console.log(e)
		}
	}
	//link to mongodb
	MongoClient.connect(url , function (err , db) {
		find(res , db , req.body.col , docs.size)
	})
}).post("/ship" , function (req , res ,next) {
	//the same operation as get
	var docs = {}
	if (req.body.docs) {
		try{
			docs = eval("(" + req.body.docs + ")") // parse string into object

		}catch(e){
			console.log(e)
		}
	}
	//link to mongodb
	MongoClient.connect(url , function (err , db) {
		var updateDocs = {}
		if (req.body.updateDocs) {
			try{
				updateDocs = eval("(" + req.body.updateDocs + ")")
			}catch(e){
				console.log(e)
			}
		}
		update(res , db , req.body.col , docs , updateDocs)
	}).put("/ship" , function (req , res , next) {
		var docs = {}
		if (req.body.docs) {
			try{
				docs = eval("(" + req.body.docs + ")")
			}catch(e){
				console.log(e)
			}
		}
		MongoClient.connect(url , function (err , db) {
			insert(res , db , req.body.col ,docs)
		})
	}).delete("/ship" , function (req , res , next) {
		var docs = {}
		if (req.body.docs) {
			try{
				docs = eval("(" + req.body.docs + ")")
			}catch(e){
				console.log(e)
			}
		}
		MongoClient.connect(url , function (err , db) {
			del(res , db , req.body.col , docs)
		})
	}).post("/ship" , function (req , res ,next) {
		var 
	})
	
