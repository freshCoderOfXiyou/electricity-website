
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
		src:String,
		wants:Array
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
		goods:Array
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
	// var userm = new userM()
	// var goodm = new goodM()
	// var wantm =new wantM()
	// var havingm = new havingM()
	// var hadm = new hadM()

	//build http server
	var express=require('express')
	var serveStatic=require('serve-static')
	var path=require('path')
	var bodyParser = require("body-parser")
	var cookieParser = require('cookie-parser')
	var favicon = require("express-favicon")
	var session = require("express-session")
	var parseurl = require("parseurl")
	var app=express()
	app.use(bodyParser.json())// for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(cookieParser())
	app.use(favicon(__dirname+"/public/images/detail/header-cola.png"))
	// res.cookie("account", {account: userName, hash: hash, last: lastTime}, {maxAge: 60000})
	// 通过req.cookies.account来访问
	// 使用req.cookies[“account”]这种方式来检测是否有account这个cookie

	app.set('port' , process.env.PORT || 3000)
	app.set('views','./views/pages')
	app.set('view engine','jade')
	app.use(express.static(path.join(__dirname,'/public'))) 
	// app.use(session({secret:"12345" , name:"11" , cookie:{maxAge:60000} , resave:true , saveUninitialized:true}))
	app.use(session({secret:"12345"}))
	app.use(function (req , res , next) {
		// var views = req.session.views
		// if (!views) {
		// 	views = req.session.views = {}
		// }
		// var pathname = parseurl(req).pathname
		// // console.log(pathname +" has been visted at time %d" , Date.now())
		// views[pathname]=(views[pathname] || 0) + 1


		var hasload = req.session.hasload
		// console.log("before enter bad if the value is : " + hasload)
		if ( !hasload ) {
			// console.log("enter bad if")
			hasload = req.session.hasload = false
			// console.log("after gave value the hasload is :" + hasload)
		}
		var pathname = parseurl(req).pathname
		// console.log(pathname)
		if (pathname == "/ajaxpost") { 
			// console.log("enter loadajax path handle")
			// console.log(req.body)
			var username = req.body.id
			var userpsw = req.body.psw
			
			// console.log("has seen the /pcload "+ req.session.views["/pcload"]+" times")
			userM.findOne({id:username,psw:userpsw} ,   function(err , result){
				if (err) {
					console.log(err)
				}
				else{
					if (result != null) {
						req.session.hasload = true
						req.session.loaderid = username
						req.session.loaderobj = result
					}
				}
			})//end function findOne
		}//end if

		if (pathname == "/paylistAjax") {
			// var paylistArg = 
			// console.log("@324 ajaxpost req is " + paylistArg)
			req.session.paylist = req.body.paylist
			console.log("@326 session req.body is " )
			console.log(req.body)
		}

		next()
	})

	

	app.get("/pcload" , require("./modules/pcload.js"))

	app.post("/pcload" , function (req , res) {
		console.log(req.body)

		var username = req.body.userid
		var userpsw = req.body.userpsw

		userM.findOne( {id:username,psw:userpsw} ,   function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				if (result == null) {
					console.log("@this request has submit bad id or psw!")
					res.send("bad id or psw!")
				}
				else{
					console.log("@the user "+ result.name +" successful enter")
					res.redirect("/pc")
				}
			}
		})//end function findOne
	})//end pcload post action

	app.get("/pcregister" , function(req , res){
		res.render('register',{
		title:'注册'
		})
	})

	app.listen(app.get('port'),function(){
		console.log("@Express started on http://localhost:"+app.get('port'))
		console.log("@Http server start at :" + new Date())
	})

	app.post("/ajaxpost" , function (req , res) {
		var username = req.body.id
		var userpsw = req.body.psw

		// console.log("has seen the /pcload "+ req.session.views["/pcload"]+" times")
		userM.findOne({id:username,psw:userpsw} ,   function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				if (result == null) {
					console.log("@this request has submit bad id or psw!")
					res.json({back:false})
				}
				else{
					console.log("@the user "+ result.name +" successful enter")
					res.json({back:true})
					// req.session.hasview = true
					// req.session.hasload["load"] = "yes"
					console.log("@/ajaxpost 901 :" , req.session)
					// res.redirect("/pc")
				}
			}
		})//end function findOne

		// res.json({back:"datadddd"})
	})

	app.post("/paylistAjax" , function(req , res){
		// var list = req.body
		// console.log("/paylistAjax")
		// console.log( req.session )
		var wantsUpdateObj = {}
		if (req.body.wantsUpdate == undefined) {
			wantsUpdateObj.wants = []
		}
		else{
			wantsUpdateObj.wants = req.body.wantsUpdate
		}
		console.log("wants update obj is :")
		console.log(wantsUpdateObj)
		var userid = req.session.loaderid
		userM.update( {id:userid} , wantsUpdateObj , function(err , updateresult){
							if (err) {
								console.log(err)
							}
							else{
								// console.log("add wants last step is " + updateresult)
								res.json({back:true})
							}
						})
		// res.json({back:true})
	})

	app.get("/mpay",function  (req,res) {
		var paylistObj = req.session.paylist

		var receiverObj = req.session.loaderobj.receiver[0]
		// console.log("@236 get mpay paylist is ")
		// console.log(paylistObj)
		// res.json(paylistObj)
		paylistObj.title = "mobile pay"
		paylistObj.receiver = receiverObj

		res.render("mpay",paylistObj)
		// res.json(paylistObj)
	})

	app.post("/payAjax" , function(req , res){
		var reqObj = req.body
		// if (reqObj !=) {}
		var paylistObj = req.session.paylist
		var thisUserid = req.session.loaderid
		var nowTime = new Date()
		reqObj.userid = thisUserid
		reqObj.time = nowTime
		reqObj.goods = paylistObj.paylist
		havingM.create([reqObj] , function(err , candies){
			if (err) {
				console.log(err)
				res.json({back:false})
			}
			else{
				console.log("@has insert one doc into havingS, doc is:"+candies+new Date)
				res.json({back:true})
			}
		})
	})

	app.get("/err" , function (req , res) {
		console.log("@/err + 910: ",req.session)
		res.status(404).send("sorry , we couldn't find this ")
	})

	app.post("/registerajax" , function (req , res) {
		var postarg = req.body
		var hasRegister = false
		console.log(req.body)
		userM.create([postarg], function(err , candies){
			if (err) {
				console.log(err)
				res.json({"result":hasRegister})
			}
			else{
				console.log("@has insert one doc into user, doc is:" , candies+new Date)
				hasRegister = true
				// var tempwants = {}
				// tempwants.userid = postarg.id
				// tempwants.goods = []
				// tempwants.time = new Date

				// wantM.create([tempwants] , function (err , candies) {
				// 	if (err) {
				// 		console.log(err)
				// 	}
				// 	else{
				// 		console.log("@has insert one doc into wants, doc is:"+candies+new Date)
				// 	}
				// })

				res.json({"result":hasRegister})
			}
		})//end user create


	})

	app.post("/managerajax" , function (req , res) {
		var postarg = req.body
		// console.log(postarg)
		
		// oper.insertGoodByObj(postarg)
		goodM.create([ postarg ],function (err , candies) {
			if (err) {
				console.log(err)
				res.json({"registed":false})
			}
			else{
				console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
				res.json({"registed":true})
			}
		})
	})

	app.post("/shopcartajax" , function (req , res) {
		// body...
		var postarg = req.body
		// var 
	})

	app.post("/addwantsAjax" , function(req , res){
		var userid = req.session.loaderid 
		var getObj = req.body
		var goodsid = getObj.id
		//find goods info
		goodM.findOne({id:goodsid} , "standard" , function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				console.log("@1002 find goods standard is :\n" + result)
				//add standard to obj
				getObj.standard = result.standard

				//get goods array of users info
				userM.findOne({id:userid} , "wants" , function(err , wantsresult){
					if (err) {
						console.log(err)
					}
					else{

						var updateObj = wantsresult.wants
						updateObj.push(getObj)
						console.log("@1014 updateObj is :" + getObj)
						// res.json(getObj)
						//update goods array of users info
						
						userM.update( {id:userid} , { wants : updateObj } , function(err , updateresult){
							if (err) {
								console.log(err)
							}
							else{
								console.log("add wants last step is " + updateresult)
								res.json({back:true})
							}
						})

						//end userm update
						
					}

				})//end userm find
			}

		})//end of goodm find

	})//end app.get

	app.get("/manager" , function (req ,res) {
		res.render("manager" , {title:"商品管理页面"})
	})

	app.get('/pcdetail',function (req,res) {

		// var result = req.query.page
		// //finde data
		// var appGoodObj = goodM.findOne( { id : result } , function(err , result){
		// 	if (err) {
		// 		console.log(err)
		// 	}
		// 	else{
		// 		// console.log(result)
		// 		var jadeArg = {
		// 			gname : result.name ,
		// 			gsubtil : result.subtitle ,
		// 			goldprice : result.oldprice ,
		// 			gnowprice : result.nowprice ,
		// 			gdetailImgs : result.detailImg ,
		// 			gmainImgs :result.mainImg ,
		// 			gstandard : result.standard,
		// 			searchWord:'箱包名品任你挑',
		// 			recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
		// 		}
				// console.log(jadeArg)
				res.render('details',
				{
					title:"pcdetail",
					searchWord:'箱包名品任你挑',
					recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
				})
		// 	}
		// })		
	})

	app.get('/pcsearch',function (req,res) {
		res.render('search',{
			title:'search',
			searchWord:'箱包名品任你挑',
			recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
		})
	})

	app.get('/pcshoppingcart',function (req,res) {
		res.render('shoppingcart',{
			title:'shoppingcart',
			searchWord:'箱包名品任你挑',
			recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
		})
	})

	app.get('/pcpay',function (req,res) {
		res.render('pay',{
			title:'支付页面',
			searchWord:'箱包名品任你挑',
			recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
		})
	})
	app.get('/mload',function (req,res) {
		res.render('m-loade',{
			title:'登录'
		})
	})

	app.get('/mindex',function (req,res) {
		var username = ""
		var isload = req.session.hasload
		if(isload){
			var username = req.session.loaderobj.name
		}

		res.render('m-index',{
			title:'mobile index',
			name:username,
			hasload:isload
		})
	})

	app.get('/mdetail',function (req,res) {
		var result = req.query.page
		//finde data
		var appGoodObj = goodM.findOne( { id : result } , function(err , result){
			if (err) {
				console.log(err)
			}
			else{
				// console.log(result)
				// var gstandString = result.standard + ""
				// console.log(gstandString)
				var jadeArg = {
					gname : result.name ,
					gsubtil : result.subtitle ,
					goldprice : result.oldprice ,
					gnowprice : result.nowprice ,
					gdetailImgs : result.detailImg ,
					gmainImgs :result.mainImg ,
					gstandard : result.standard,
					gid : result.id
				}
				console.log(jadeArg)
				res.render('m-detail',jadeArg)
			}	

		})
		// console.log("query obj is :")
		// console.log( appGoodObj)
		
	})


	

	// app.get("/indexSeach" , function (req , res) {
	// 	// body...
	// 	var keyword = req.query.keyword
	// 	var re = "/"+keyword +"/"
	// 	var query = userM.find({'name':re})
	// })
	
	app.get("/mregister" , function(req , res){
		res.render("mregister.jade",{
			title:"mregister"
		})
	})

	app.get("/mshopcart" , function(req , res){
		//find users wants 
		//get userid 
		var userid = req.session.loaderid
		if (!req.session.hasload) {
			res.redirect("/mload")
		}else{
			userM.findOne({id:userid} , "wants" , function(err , result){
				if (err) {
					console.log(err)
				}
				else{
					console.log(result)
					var arg = {}
					arg.wants = result.wants
					if(arg.wants.length == 0 ){
						arg.hasWants = false
					}
					else{
						arg.hasWants = true 
					}
					console.log("arg is :\n"+arg)
					console.log("wants is :\n"+arg.wants)
					res.render("mshopcart",arg)
					
					// res.send("ok")
					// return result
				}	
			})
		}//end else
		
		// res.render("mshopcart",{
		// 	title:"mshopcart"
		// })
	})

	app.get("/msearch" , function(req , res){
		res.render("m-search",{
			title:"mserach"
		})
	})

	app.get('/pc' , function (req , res ) {
		var hasload = req.session.hasload
		var loaderid = req.session.loaderid 
		var loaderobj = null
		var loadername = ""

		 var argments = {
		 	hasload:false,
		 	loadername:"",
			title:'电子商务',
			searchWord:'箱包名品任你挑',
			recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤'],
			floors:[
				{
					floorId:'secondFloor',
					floorName:'户外出行',
					floorSubName:'OUTDOORS&nbsp & &nbspAUTOMOTIVE',
					floorHotwords:['车秒贷','皮肤衣','运动鞋','4s保养','行车记录仪','轮胎'],
					MainImg:'./images/index/second-main.jpg',
					secondFloorSlides:['新车装备一站购齐','安全出行必备','下订送海量油卡' ],
					floorContitle:'好车低价预售',
					floorSubtitle:'购好车送千元礼',
					grids:[
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub.jpg'
						}
					],
					right:[
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub-left.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub-left.jpg'
						},
						{
							title:'双十二整车特卖啦',
							subtitle:'贷款买车2年0利率哟',
							imgsrc:'./images/index/second-sub-left.jpg'
						}
					]
				},//end floor,
				{
					floorId:'thridFloor',
					floorName:'打造爱巢',
					floorSubName:'HOME',
					floorHotwords:['家具','大家电','四件套','健康电器','厨房电器','吸顶灯','平板电视','装修设计','跑步机' ],
					MainImg:'./images/index/3-main.jpg',
					secondFloorSlides:['全球大牌汇聚','精明老婆首选','爆款必抢'],
					floorContitle:'双12家纺家居',
					floorSubtitle:'爆款直降',
					grids:[
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						},
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						},
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						},
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						},
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						},
						{
							title:'爆款布艺沙发',
							subtitle:'热销榜单专场',
							imgsrc:'./images/index/3-sub.jpg'
						}
					],
					right:[
						{
							title:'简约新品',
							subtitle:'新纯棉四件套',
							imgsrc:'./images/index/3-sub-left.jpg'
						},
						{
							title:'简约新品',
							subtitle:'新纯棉四件套',
							imgsrc:'./images/index/3-sub-left.jpg'
						},
						{
							title:'简约新品',
							subtitle:'新纯棉四件套',
							imgsrc:'./images/index/3-sub-left.jpg'
						}
					]
				},//end floor,
				{
					floorId:'fourthFloor',
					floorName:'居家生活',
					floorSubName:'GROCERY & HEALTH',
					floorHotwords:['零食','牛奶','居家饰品','保温杯','保健品','常用药','热门图书','洗发水','卫生巾','家庭清洁','狗粮' ],
					MainImg:'./images/index/4-main.jpg',
					secondFloorSlides:['橙意鲜果 买一送一','2016年12月天猫首发','王者归来 三果志第二季'],
					floorContitle:'王者归来',
					floorSubtitle:'三果志第二季',
					grids:[
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						},
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						},
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						},
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						},
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						},
						{
							title:'家居花瓶摆设',
							subtitle:'家装设计师青睐之选',
							imgsrc:'./images/index/4-sub.jpg'
						}
					],
					right:[
						{
							title:'Hugo暖水袋',
							subtitle:'寒冷冬日，温暖有礼',
							imgsrc:'./images/index/4-sub-left.jpg'
						},
						{
							title:'Hugo暖水袋',
							subtitle:'寒冷冬日，温暖有礼',
							imgsrc:'./images/index/4-sub-left.jpg'
						},
						{
							title:'Hugo暖水袋',
							subtitle:'寒冷冬日，温暖有礼',
							imgsrc:'./images/index/4-sub-left.jpg'
						}
					]
				},//end floor,
				{
					floorId:'fifthFloor',
					floorName:'潮店酷玩',
					floorSubName:'ELECTRONICS',
					floorHotwords:['手机','iPhone','相机','数码配件','影音电玩','生活电器','个人护理','电脑硬件','笔记本'],
					MainImg:'./images/index/5-main.jpg',
					secondFloorSlides:['取暖器219元','空气净化器/取暖器专场','大牌爆款云集' ],
					floorContitle:'除霾抗寒',
					floorSubtitle:'送你蓝天和温暖',
					grids:[
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						},
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						},
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						},
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						},
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						},
						{
							title:'小米手环2',
							subtitle:'送手环专用贴膜',
							imgsrc:'./images/index/5-sub.jpg'
						}
					],
					right:[
						{
							title:'送手环专用贴膜',
							subtitle:'1600万前后双摄像',
							imgsrc:'./images/index/5-sub-left.jpg'
						},
						{
							title:'送手环专用贴膜',
							subtitle:'1600万前后双摄像',
							imgsrc:'./images/index/5-sub-left.jpg'
						},
						{
							title:'送手环专用贴膜',
							subtitle:'1600万前后双摄像',
							imgsrc:'./images/index/5-sub-left.jpg'
						}
					]
				},//end floor
				{
					floorId:'sixthFloor',
					floorName:'美丽人生',
					floorSubName:'FASHION&BEAUTY',
					floorHotwords:['连衣裙','T恤男','美容护肤','休闲男鞋','黄金项链','单鞋','女包','文胸','大牌腕表' ],
					MainImg:'./images/index/6-main.jpg',
					secondFloorSlides:['毛呢尖货全在这','赶紧来选选','羽绒服5折起' ],
					floorContitle:'商场大牌逛不停',
					floorSubtitle:' 冬季超值好货',
					grids:[
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						},
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						},
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						},
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						},
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						},
						{
							title:'双十二狂潮再起',
							subtitle:'狂欢继续',
							imgsrc:'./images/index/6-sub.jpg'
						}
					],
					right:[
						{
							title:'秋冬加绒裤',
							subtitle:'裂帛2016秋冬新款',
							imgsrc:'./images/index/6-sub-left.jpg'
						},
						{
							title:'秋冬加绒裤',
							subtitle:'裂帛2016秋冬新款',
							imgsrc:'./images/index/6-sub-left.jpg'
						},
						{
							title:'秋冬加绒裤',
							subtitle:'裂帛2016秋冬新款',
							imgsrc:'./images/index/6-sub-left.jpg'
						}
					]
				}//end floor
			],//end floors
			flagships:[
				{
						logo:'./images/index/flagship/brandlog2.jpg',
						name:'华艺官方旗舰店',
						number:'13.0万粉丝',
						good:[
							{
							imgsrc:"./images/index/flagship/brand2goods2.webp",
							title:'华艺简约LED吸顶长方形客厅灯卧室餐厅双光调光灯',
							price:'￥338'
							},
							{
							imgsrc:"./images/index/flagship/brand2goods2.webp",
							title:'华艺简约LED吸顶长方形客厅灯卧室餐厅双光调光灯',
							price:'￥338'
							},
							{
							imgsrc:"./images/index/flagship/brand2goods2.webp",
							title:'华艺简约LED吸顶长方形客厅灯卧室餐厅双光调光灯',
							price:'￥338'
							},
						]
				},//a single flagship
				{
						logo:'./images/index/flagship/chengguang.jpg',
						name:'晨光官方旗舰店',
						number:'72.0万粉丝',
						good:[
							{
							imgsrc:"./images/index/flagship/chengguang.webp",
							title:'【包邮】晨光文具中性笔替芯黑0.38mm水笔学生办公笔芯 60支装',
							price:'￥338'
							},
							{
							imgsrc:"./images/index/flagship/chengguang.webp",
							title:'【包邮】晨光文具中性笔替芯黑0.38mm水笔学生办公笔芯 60支装',
							price:'￥338'
							},
							{
							imgsrc:"./images/index/flagship/chengguang.webp",
							title:'【包邮】晨光文具中性笔替芯黑0.38mm水笔学生办公笔芯 60支装',
							price:'￥24.9'
							},
						]
				},//a single flagship
				{
						logo:'./images/index/flagship/telihe.jpg',
						name:'特力和乐官方旗舰店',
						number:'10.8万粉丝',
						good:[
							{
							imgsrc:"./images/index/flagship/telihe.webp",
							title:'[12/12起发货]HOLA特力屋思培条纹针织拖秋冬居家地板拖鞋子软底',
							price:'￥39.9'
							},
							{
							imgsrc:"./images/index/flagship/telihe.webp",
							title:'[12/12起发货]HOLA特力屋思培条纹针织拖秋冬居家地板拖鞋子软底',
							price:'￥39.9'
							},
							{
							imgsrc:"./images/index/flagship/telihe.webp",
							title:'[12/12起发货]HOLA特力屋思培条纹针织拖秋冬居家地板拖鞋子软底',
							price:'￥39.9'
							},
						]
				},//a single flagship
				{
						logo:'./images/index/flagship/brandlog3.jpg',
						name:'福田汽车配件官方旗舰店',
						number:'7067粉丝',
						good:[
							{
							imgsrc:"./images/index/flagship/brands3goods1.webp",
							title:'福田汽车货车通用乙二醇冷冻液 正品汽车发动机防冻液 J-40 4升',
							price:'￥55.7'
							},
							{
							imgsrc:"./images/index/flagship/brands3goods1.webp",
							title:'福田汽车货车通用乙二醇冷冻液 正品汽车发动机防冻液 J-40 4升',
							price:'￥55.7'
							},
							{
							imgsrc:"./images/index/flagship/brands3goods1.webp",
							title:'福田汽车货车通用乙二醇冷冻液 正品汽车发动机防冻液 J-40 4升',
							price:'￥55.7'
							},
						]
				}//a single flagship
			],//end flagships
			wonderful:[
				{
					imgsrc:'./images/index/guess/guess-diai.jpg',
					desc:'[热销]DILOVE蒂爱进口永生花礼盒玻璃罩蓝色妖姬玫瑰花鲜花全国速递顺丰',
					inter:'138',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-chabei.jpg',
					desc:'希诺双层玻璃杯带手柄商务办公室泡茶杯过滤网透明水晶杯子',
					inter:'148',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-dianzi.jpg',
					desc:'可优比婴儿爬行垫环保xpe爬爬垫加厚泡沫儿童地垫宝宝游戏垫家用',
					inter:'197',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-diaodeng.jpg',
					desc:'客厅欧式吊灯全铜灯具复古美式铜灯乡村大气简约餐厅卧室灯灯饰',
					inter:'480',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-kailiou.jpg',
					desc:'KEIKO/凯莉欧原创2016冬装新款韩版宽松毛领过膝长款加厚连帽棉衣',
					inter:'538',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-kk.jpg',
					desc:'韩国kk树儿童雨鞋雨衣套装宝宝雨靴男童女童雨鞋防滑小孩水鞋夏季',
					inter:'117',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-lutou.jpg',
					desc:'美式复古实木照片墙欧式客厅卧室创意鹿头挂墙个性相框背景墙组合',
					inter:'228',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-luyinbi.jpg',
					desc:'[热销]JNN S6新款手表录音笔 专业运动手环微型防窃听高清远距降噪MP3器',
					inter:'158',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-mianfu.jpg',
					desc:'[热销]新品大促 秋冬装棉衣男长款加厚 情侣棉衣外套潮 青年男棉服',
					inter:'138',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-zhongguojie.jpg',
					desc:'[热销]一红中国结壁钟时尚装饰钟表挂钟客厅创意现代石英钟大号时钟静音',
					inter:'138',
					decimal:'.00'
				},
				{
					imgsrc:'./images/index/guess/guess-diai.jpg',
					desc:'[热销]DILOVE蒂爱进口永生花礼盒玻璃罩蓝色妖姬玫瑰花鲜花全国速递顺丰',
					inter:'138',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-chabei.jpg',
					desc:'希诺双层玻璃杯带手柄商务办公室泡茶杯过滤网透明水晶杯子',
					inter:'148',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-dianzi.jpg',
					desc:'可优比婴儿爬行垫环保xpe爬爬垫加厚泡沫儿童地垫宝宝游戏垫家用',
					inter:'197',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-diaodeng.jpg',
					desc:'客厅欧式吊灯全铜灯具复古美式铜灯乡村大气简约餐厅卧室灯灯饰',
					inter:'480',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-kailiou.jpg',
					desc:'KEIKO/凯莉欧原创2016冬装新款韩版宽松毛领过膝长款加厚连帽棉衣',
					inter:'538',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-kk.jpg',
					desc:'韩国kk树儿童雨鞋雨衣套装宝宝雨靴男童女童雨鞋防滑小孩水鞋夏季',
					inter:'117',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-lutou.jpg',
					desc:'美式复古实木照片墙欧式客厅卧室创意鹿头挂墙个性相框背景墙组合',
					inter:'228',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-luyinbi.jpg',
					desc:'[热销]JNN S6新款手表录音笔 专业运动手环微型防窃听高清远距降噪MP3器',
					inter:'158',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-mianfu.jpg',
					desc:'[热销]新品大促 秋冬装棉衣男长款加厚 情侣棉衣外套潮 青年男棉服',
					inter:'138',
					decimal:'.00'
				},//a single wonder
				{
					imgsrc:'./images/index/guess/guess-zhongguojie.jpg',
					desc:'[热销]一红中国结壁钟时尚装饰钟表挂钟客厅创意现代石英钟大号时钟静音',
					inter:'138',
					decimal:'.00'
				}
			]//end wonderful
		}
		if (hasload) {
			//find users info
			var loaderobj = userM.findOne( {id:loaderid} , function(err , result){
				if (err) {
					console.log(err)
				}
				else{
					console.log(result)
					loadername = result.name
					argments.hasload = true
					argments.loadername = loadername
					res.render('index', argments)//end render function
				}
			})
		}
		else{
			res.render('index', argments)//end render function
		}

		console.log("line 310 " + hasload , loaderid , loadername)
	})//end get pc

}) //end of once





	//add function to oper
	// oper.insertUser = function (id , name , psw , phone , receiverName , receiverAddress , receiverPhone , src) {
	// 	console.log("has successful enter in !")
	// 	//build obj
	// 	var temp = {}
	// 	temp.id = id
	// 	temp.name = name
	// 	temp.psw = psw
	// 	temp.phone = phone
	// 	temp.receiver = []
	// 	var tempReceiver = {}
	// 	tempReceiver.receiverName = receiverName
	// 	tempReceiver.receiverAddress = receiverAddress
	// 	tempReceiver.receiverPhone = receiverPhone
	// 	temp.receiver.push(tempReceiver)
	// 	temp.src = src || "./images/mobile/detail/header2.jpeg"
	// 	console.log(temp)
	// 	userM.create([temp] , function(err , candies){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into user, doc is:"+candies+new Date)
	// 		}
	// 	})



	// }//end function "insertUser"

	// oper.insertUserByObj = function (obj) {
	// 	console.log("has successful enter in !" , obj)
	// 	userM.create([obj], function(err , candies){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into user, doc is:"+candies+new Date)
	// 		}
	// 	})



	
	// }//end function "insertUser"

	// oper.insertGood = function (id , name , subtitle , oldprice , nowprice , loc , standard ,mainImg , detailImg) {
	// 	// body...
	// 	var temp = {}
	// 	temp.id = id
	// 	temp.name = name
	// 	temp.subtitle = subtitle
	// 	temp.oldprice = oldprice
	// 	temp.nowprice = nowprice
	// 	temp.loc = loc 
	// 	temp.standard = standard
	// 	temp.mainImg = mainImg
	// 	temp.detailImg = detailImg
	// 	goodM.create([temp],function (err , candies) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
	// 		}
	// 	})
	// }

	// oper.insertGoodByObj = function (arg) {
	// 	// body...
	// 	goodM.create([ arg ],function (err , candies) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
	// 		}
	// 	})

	// }

	// oper.insertWant = function (userid , goods) {
	// 	var temp = {}
	// 	temp.userid = userid
	// 	temp.time = new Date()
	// 	temp.goods = goods
	// 	wantM.create([temp],function (err , candies) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
	// 		}
	// 	})
	// }
	// // function 

	// oper.insertHaving = function(userid , goods , receiverName ,receiverAddress ,receiverPhone){
	// 	var temp = {}
	// 	temp.userid = userid
	// 	temp.time = new Date()
	// 	temp.goods = goods
	// 	temp.receiverName = receiverName
	// 	temp.receiverAddress = receiverAddress
	// 	temp.receiverPhone = receiverPhone
	// 	havingM.create([temp] , function (err , candies) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
	// 		}
	// 	})
	// }

	// oper.insertHad = function(userid , goods ,receiverName ,receiverAddress ,receiverPhone){
	// 	var temp = {}
	// 	temp.userid = userid
	// 	temp.time = new Date()
	// 	temp.goods = goods
	// 	temp.receiverName = receiverName
	// 	temp.receiverAddress = receiverAddress
	// 	temp.receiverPhone = receiverPhone
	// 	hadM.create([temp] , function (err , candies) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log("@has insert one doc into goods collection , doc is :"+candies + new Date)
	// 		}
	// 	})

	// }

	// oper.userLoading= function(userid , psw){
	// 	userM.findOne({id:userid,psw:psw} ,   function(err , result){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			if (result == null) {
	// 				console.log("@this request has submit bad id or psw!")
	// 				return false
	// 			}
	// 			else{
	// 				console.log("@the user "+ result.name +" successful enter")
	// 				return true
	// 			}

	// 		}
	// 	})
	// }

	// oper.getUserInfoByKeyword = function(userid , keyword){
	// 	userM.findOne({id:userid} , keyword , function(err , result){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log(result)
	// 			return result
	// 		}

	// 	})
	// }

	// oper.getUserAll = function (userid ) {
	// 	userM.findOne({id:userid} , function(err , result){
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 		else{
	// 			console.log(result)
	// 			return result
	// 		}
	// 	})
	// }


	// oper.insertUser("18812340001","张三","abcd","18812341234","张三","陕西西安市雁塔区","18812341234","./public/images/header.png")
	// oper.insertGood("1001","Midea/美的 F60-15WB5(Y)60升电热水器50即热洗澡速热家用储水式","单店热销16万台 节能省电 远程遥控",2699,1099,"广东广州",[{name:"容积",items:["10L","20L"]},{name:"功率",items:["500w","1000w"]}],["./images/pc/meidi/main1.jpg","./images/pc/meidi/main2.jpg"],["./images/pc/meidi/detail1.jpg","./images/pc/meidi/detail2.jpg"])
	// oper.insertWant("18812341234",[{id:"1001",count:"1",standard:[{name:"容积",value:"10L"} , {name:"功率",value:"1000w"}]} , {id:"1001",count:"1",standard:[{name:"容积",value:"10L"} , {name:"功率",value:"1000w"}]}])
	// oper.userLoading("18812340001" , "abcd")
	// oper.getUserInfo("18812340001" , "src")
	// var obj = oper.getUserAll("18812340001")
	// console.log("the return value is :"+ obj)