
// @开始构建电商平台数据库
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/ec")
var oper = {}
var db = mongoose.connection
db.on("error" , console.error.bind(console , "connect error:"))
db.once("open" , function () {
	console.log("the mongodb has been connect at "+ new Date())
	//build five schema
	var userS = mongoose.Schema({
		id:String,
		name:String,
		psw:String,
		phone:String,
		receiver:Array,
		src:String
	})

	var goodS = mongoose.Schema({
		id:String,
		name:String,
		subtitle:String,
		oldprice:Number,
		nowprice:Number,
		loc:String,
		standard:Array,
		mainImg:Array,
		detailImg:Array
	})

	var wantS = mongoose.Schema({
		userid:String,
		time:Date,
		goods:Array,
	})

	var havingS = mongoose.Schema({
		userid:String,
		time:Date,
		goods:Array,
		receiverName:String,
		receiverAddress:String,
		receiverPhone:String
	})

	var hadS = mongoose.Schema({
		userid:String,
		time:Date,
		goods:Array,
		receiverName:String,
		receiverAddress:String,
		receiverPhone:String
	})

	//build five models
	var userM = mongoose.model("user" , userS)
	var goodM = mongoose.model("good" , goodS)
	var wantM = mongoose.model("want" , wantS)
	var havingM = mongoose.model("having" , havingS)
	var hadM = mongoose.model("had" , hadS)

	//build five instance
	var userm = new userM()
	var goodm = new goodM()
	var wantm =new wantM()
	var havingm = new havingM()
	var hadm = new hadM()

	//add function to oper
	oper.insertUser = function (id , name , psw , phone , receiverName , receiverAddress , receiverPhone , src) {
		console.log("has successful enter in !")
		//build obj
		var temp = {}
		temp.id = id
		temp.name = name
		temp.psw = psw
		temp.phone = phone
		temp.receiver = []
		var tempReceiver = {}
		tempReceiver.receiverName = receiverName
		tempReceiver.receiverAddress = receiverAddress
		tempReceiver.receiverPhone = receiverPhone
		temp.receiver.push(tempReceiver)
		temp.src = src || "./images/mobile/detail/header2.jpeg"
		console.log(temp)
		userM.create([temp] , function(err , candies){
			if (err) {
				console.log(err)
			}
			else{
				console.log("@has insert one doc into user, doc is:"+candies+new Date)
			}
		})
	}//end function "insertUser"

	oper.insertGood = function (id , name , subtitle , oldprice , nowprice , loc , standard ,mainImg , detailImg) {
		// body...
		var temp = {}
		temp.id = id
		temp.name = name
		temp.subtitle = subtitle
		temp.oldprice = oldprice
		temp.nowprice = nowprice
		temp.loc = loc 
		temp.standard = standard
		temp.mainImg = mainImg
		temp.detailImg = detailImg
		goodM.create([temp],function (err , candies) {
			if (err) {
				console.log(err)
			}
			else{
				console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
			}
		})
	}


	oper.insertWant = function (userid , goods) {
		var temp = {}
		temp.userid = userid
		temp.time = new Date()
		temp.goods = goods
		wantM.create([temp],function (err , candies) {
			if (err) {
				console.log(err)
			}
			else{
				console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
			}
		})
	}
	// function 

	oper.insertHaving = function(userid , goods , receiverName ,receiverAddress ,receiverPhone){
		var temp = {}
		temp.userid = userid
		temp.time = new Date()
		temp.goods = goods
		temp.receiverName = receiverName
		temp.receiverAddress = receiverAddress
		temp.receiverPhone = receiverPhone
		havingM.create([temp] , function (err , candies) {
			if (err) {
				console.log(err)
			}
			else{
				console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
			}
		})
	}

	oper.insertHad = function(userid , goods ,receiverName ,receiverAddress ,receiverPhone){
		var temp = {}
		temp.userid = userid
		temp.time = new Date()
		temp.goods = goods
		temp.receiverName = receiverName
		temp.receiverAddress = receiverAddress
		temp.receiverPhone = receiverPhone
		hadM.create([temp] , function (err , candies) {
			if (err) {
				console.log(err)
			}
			else{
				console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
			}
		})

	}

	oper.userLoading= function(userid , psw){
		userM.findOne({id:userid,psw:psw} ,   function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				if (result == null) {
					console.log("@this request has submit bad id or psw!")
				}
				else{
					console.log("@the user "+ result.name +" successful enter")
					return result
				}

			}
		})
	}

	oper.getUserInfo = function(userid , keyword){
		userM.findOne({id:userid} , keyword , function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				return result
			}

		})
	}
	// oper.insertUser("18812340001","张三","abcd","18812341234","张三","陕西西安市雁塔区","18812341234","./public/images/header.png")
	// oper.insertGood("1001","Midea/美的 F60-15WB5(Y)60升电热水器50即热洗澡速热家用储水式","单店热销16万台 节能省电 远程遥控",2699,1099,"广东广州",[{name:"容积",items:["10L","20L"]},{name:"功率",items:["500w","1000w"]}],["./images/pc/meidi/main1.jpg","./images/pc/meidi/main2.jpg"],["./images/pc/meidi/detail1.jpg","./images/pc/meidi/detail2.jpg"])
	// oper.insertWant("18812341234",[{id:"1001",count:"1",standard:[{name:"容积",value:"10L"} , {name:"功率",value:"1000w"}]} , {id:"1001",count:"1",standard:[{name:"容积",value:"10L"} , {name:"功率",value:"1000w"}]}])
	oper.userLoading("18812340001" , "abcd")
}) //end of end
	
//create obj by arg
function createUserObj(id , name , psw , phone , receiver , src) {
	var temp = {}
	temp.id = id
	temp.name = name
	temp.psw = psw
	temp.phone = phone
	temp.receiver = []
	temp.receiver.push(receiver)
	temp.src = src
}









