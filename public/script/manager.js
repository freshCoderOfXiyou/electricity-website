!function () {
	window.onload = function () {
		//get jquery obj
		var $nameEle = $("#input-gname")
		var $subtilEle = $("#input-gsubtitle")
		var $idEle = $("#input-gid")
		var $oldpriceEle = $("#input-oldprice")
		var $nowpriceEle = $("#input-nowprice")
		var $locEle = $("#input-gloc")
		var $mainsrcEle = $("#input-mainsrc")
		var $detailsrcEle = $("#input-detailsrc")
		var $standardEle = $("#input-standard")
		var $submitBtn = $("#submit")
		//set send obj
		var resultObj = {
			id:"",
			name:"",
			subtitle:"",
			oldprice:"",
			nowprice:"",
			detailImg:[],
			mainImg:[],
			standard:[]
		}

		//add event listener to send btn
		$submitBtn.bind("click" , function(){
			//get value of input
			var nameTxt = $nameEle.val()
			var subtilTxt = $subtilEle.val()
			var idTxt =  $idEle.val()
			var oldpriceTxt = $oldpriceEle.val()
			var nowpriceTxt = $nowpriceEle.val()
			var locTxt = $locEle.val()
			var mainimgTxt = $mainsrcEle.val().split(";")
			var mainimgLen = mainimgTxt[1]
			var detimgLen = mainimgTxt[2]
			var mainPath = mainimgTxt[0]
			var mainImgArray = []
			var detImgArray = []
			for(var i=1;i<=detimgLen;i++){
				var temPath = mainPath + "d" + i + ".jpg"
				detImgArray.push(temPath)
			}
			for(var i=1;i<=mainimgLen;i++){
				var temPath = mainPath + "b" + i + ".jpg"
				mainImgArray.push(temPath)
			}
			var detailimgTxt = $detailsrcEle.val().split(";")
			var standardTxt = $standardEle.val().split("&")
			var standardObjArray = []
			//convert standardtxt from string to obj
			for(var i=0,len=standardTxt.length ; i < len ; i++){
				var itemindex = standardTxt[i].indexOf("=")
				var itemstandardName = standardTxt[i].substring(0,itemindex)
				var itemstandardList = standardTxt[i].substring(itemindex+1)
				itemstandardList = itemstandardList.split(";")
				var temobj = {}
				temobj.name = itemstandardName
				temobj.items = itemstandardList
				// console.log("name is :"+temobj.name +" items is :"+temobj.items)
				standardObjArray.push(temobj)
			}
			//give value to result obj
			resultObj.name = nameTxt
			resultObj.id = idTxt
			resultObj.subtitle = subtilTxt
			resultObj.oldprice = oldpriceTxt
			resultObj.nowprice = nowpriceTxt
			resultObj.detailImg = detImgArray
			resultObj.mainImg = mainImgArray
			resultObj.standard = standardObjArray
			console.log(resultObj)
			$.post("/managerajax" , resultObj ,function(res){
				console.log(res)
			})
			
		})

	}//end of window onload
}()