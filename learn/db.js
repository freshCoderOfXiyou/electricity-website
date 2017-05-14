//@ 在mongoose官网学习API之后总结的代码
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/test")

var db = mongoose.connection 
db.on("error" , console.error.bind(console , "connect error:"))
db.once("open" , function () {
	// all db oprate in this callback function
	console.log("we connected")
	var s = mongoose.Schema({
		name : String ,
		psw : String 
	})
	//schema could has method and every instance has the method
	//在mongoose中定义的model的名称转化为集合，首先变model为小写然后再加上s
	var M = mongoose.model("L" , s)
	var m = new M()
	var array = [{ name:"jyy" , psw:"123"} , { name:"lmx" , psw:"123"}]
	M.create( array , function (err , candies) {
		// body...
		if (err) {
			console.log(err)
			return
		}else{
			console.log(candies[0],candies[1])
		}
	})

	// M.findOne({name:"jyy"} , "psw" , function (err , adventure) {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	else{
	// 		console.log(adventure.psw)
	// 	}
	// })

	// M.find({name:"jyy"} , function(err , docs){
	// 	if (err) {
	// 		connection.log(err)
	// 	}
	// 	else{
	// 		console.log(docs)
	// 	}
	// })

	// M.findOneAndRemove({name:"jyy"} , function(err , result){
	// 	if (err) {
	// 		connection.log(err)
	// 	}
	// 	else{
	// 		console.log(result)
	// 	}

	// })

	// M.findOneAndUpdate({name:"xpl"},{name:"aaa"},function (err , result) {
	// 	if (err) {
	// 		connection.log(err)
	// 	}
	// 	else{
	// 		console.log(result)
	// 	}
	// })

	
})
