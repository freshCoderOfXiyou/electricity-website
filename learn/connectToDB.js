// @第一次连接数据库的学习代码
var mongoose = require("mongoose")
var dburl = "mongodb://127.0.0.1:27017/blog"
mongoose.connect(dburl)

mongoose.connection.on("connected" , function(){
	console.log("mongoose has connect to "+dburl)
})
mongoose.connection.on("error" , function (e) {
	console.log("err has happend at:"+e)
})
mongoose.connection.on("disconnected" , function () {
	console.log("mongoose disconnected")
})
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination')
        process.exit(0)
    })
})




//oprate like insert , find , remove , ensureIndex 
// var mongoose = require('mongoose');

// var uri = 'mongodb://username:password@hostname:port/databasename';
 // uri = 'mongodb://localhost/mongo';

// mongoose.connect(uri);

//在Schma里定义数据类型
// var BookSchma = new mongoose.Schema({ //定义一个Schema
//     name: String,
//     author: String,
//     publishTime:Date
// });

// mongoose.model('Book',BookSchma);//将该Schema发布为Model

/*通过Model我们就可以创建、删除和修改mongodb里面的文档，MongoDB为我们提供了Schema，
Schema则提供了数据类型和结构的定义。*/
// 然后在该目录下再新建一个名为insert.js的文件：

// var mongoose = require('mongoose');
// require('./script.js');
// var Book = mongoose.model('Book');//Book为model name

// var book = new Book({
//     name: 'MEAN Web Development',
//     author: 'trigkit4',
//     publishTime: new Date()
// });

// book.save(function (err) {
//     console.log('save status:',err ? 'failed' : 'success');
// });

   
    // find查询操作，返回结果包含在数组里（单个的请使用findOne()）

    
    // var mongoose = require('mongoose');
    // require('./script');
    
    // var Book = mongoose.model('Book');
    
    /*
    
    find参数：
    1.<Object>mongodb selector
    2.<Function>err:错误信息，results：查询结果
     */
    
    // Book.find({}, function (err,results) {
    //     if(err){
    //         console.log('error message',err);
    //         return;
    //     }
    //     console.log('results',results);
    // });