// function:insert record to database
// @param1: res 返回前台的句柄
// @param2: db 数据库连接句柄
// @param3: col collection集合名
// @param4: docs 插入的语句
// @param5: callback 回调函数
function insert(res , db , col , docs , callback) {
	// body...
	var obj = {}
	//捕获插入异常，如果出现异常则给前台返回异常信息
	try{
		//获取document的集合
		var collection = db.collection(col)
		// 插入数据
		collection.insert(docs , function (err , result ) {
			//如果出现异常，err不为空，将异常信息放到返回信息obj中
			if (err) {
				obj.msg = err
				console.log(err)
			}
			else{
				// 如果没有出现异常，则将结果放到返回对象obj中
				obj.data = result 
				obj.suc = true
			}
			//关闭连接,insert是异步方法，需要关闭内部数据连接
			db.close()
			//将json格式返回给前台页面
			res.json(obj)
			
		})
	}catch(e){
		obj.msg = e.toString()
		console.log("异常信息是：")
		console.log(e)
		res.json(obj)
	}
}//end function

// function: update data of database
// @param1: res 返回前台的句柄
// @param2: db 数据库连接句柄
// @param3: col collection集合名
// @param4: docs 修改字段的条件
// @param5: updateDocs 跟新条件
// @param6: callback 回调函数
function update(res , db , col , docs , callback) {
	// body...
	var obj = {}
	try{
		//获取documents集合
		var collection = db.collection(col)
		//更新
		collection.updateMany(docs , updateDocs , function (err , result) {
			if (err) {
				obj.msg = err
				console.log(err)
			}else{
				obj.data = result
				obj.suc = true
			}
			db.close()
			res.json(obj)
		})
	}catch(e){
		obj.msg =  e.toString()
		console.log("update 异常信息是："+e)
		res.json(obj)
	}
}//end function


// function: delete data of database
// @param1: res 返回前台的句柄
// @param2: db 数据库连接句柄
// @param3: col collection集合名
// @param4: docs 删除的条件
// @param5: size 删除数量
// @param6: callback 回调函数
function delete(res , db , col , docs , size , callback) {
	// body...
	var obj = {}
	try{
		var collection = db.collection(col)
		collection.remove(docs , function (err , result) {
			if (err) {
				obj.msg = err
				console.log(err)
			}else{
				obj.data = result
				obj.suc = true
			}
			db.close()
			res.json(obj)

		})
	}catch(e){
		obj.msg =  e.toString()
		console.log("update 异常信息是："+e)
		res.json(obj)
	}
}//end function


// function: find data of database
// @param1: res 返回前台的句柄
// @param2: db 数据库连接句柄
// @param3: col collection集合名
// @param4: docs 查询的条件
function find(res , db , col , docs ) {
	// body...
	var obj = {}
	try{
		var collection = db.collection(col)
		var cursor = collection.find(docs);
		//限制查询返回的结果数据集数量
		cursor.limit(parseInt(size)).toArray(function (err , result) {
			if (err) {
				obj.msg = err
				console.log(err)
			}else{
				obj.data = result
				obj.suc = true
			}
			db.close()
			res.json(obj)
		})
	}catch(e){
		obj.msg =  e.toString()
		console.log("update 异常信息是："+e)
		res.json(obj)
	}
}//end function

