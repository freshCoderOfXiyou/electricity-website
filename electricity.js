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
		title:'电子商务'
	})
})
app.listen(app.get('port'),function(){
	console.log("Express started on http://localhost:"+app.get('port')+";press Ctrl-c to continue")
})
console.log(__dirname)