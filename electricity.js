// @老版本的主文件，没有和数据库做连接、没有处理参数、没有动态生成、没有处理表单、没有构建模块
var express=require('express')
var serveStatic=require('serve-static')
var path=require('path')
var app=express()

app.set('port' , process.env.PORT || 3000)
app.set('views','./views/pages')
app.set('view engine','jade')
// app.use(serveStatic('/public'))
app.use(express.static(path.join(__dirname,'/public'))) 
app.get('/' , function(req,res){
	// res.type('text/html')
	// res.send('welcome to electicity !') 
	res.render('index',{
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
	})//end render function
})
app.get('/detail',function (req,res) {
	res.render('details',{
		title:'detail',
		searchWord:'箱包名品任你挑',
		recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
	})
})
app.get('/search',function (req,res) {
	res.render('search',{
		title:'search',
		searchWord:'箱包名品任你挑',
		recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
	})
})
app.get('/shoppingcart',function (req,res) {
	res.render('shoppingcart',{
		title:'shoppingcart',
		searchWord:'箱包名品任你挑',
		recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
	})
})

app.get('/pay',function (req,res) {
	res.render('pay',{
		title:'支付页面',
		searchWord:'箱包名品任你挑',
		recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
	})
})
app.get('/register',function (req,res) {
	res.render('register',{
		title:'注册'
	})
})
app.get('/load',function (req,res) {
	res.render('loading',{
		title:'登录'
	})
})
app.get('/mload',function (req,res) {
	res.render('m-loade',{
		title:'登录'
	})
})
app.get('/mindex',function (req,res) {
	res.render('m-index',{
		title:'登录'
	})
})

app.get('/mdetail',function (req,res) {
	res.render('m-detail',{
		title:'Nike'
	})
})
app.get("/mpay",function  (req,res) {
	res.render("m-pay",{
		title:"mobile pay page"
	})
})
app.get("/videotest" , function  (req,res) {
	res.render("videotest",{
		title:"aaa"
	})
})
app.listen(app.get('port'),function(){
	console.log("Express started on http://localhost:"+app.get('port')+";press Ctrl-c to continue")
})
console.log(__dirname)
