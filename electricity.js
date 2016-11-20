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
		recommands:['羽绒服','|','零食','|','四件套','|','电暖气','|','保暖内衣','|','靴子','|','沙发','|','打底裤']
	})
})
app.listen(app.get('port'),function(){
	console.log("Express started on http://localhost:"+app.get('port')+";press Ctrl-c to continue")
})
console.log(__dirname)