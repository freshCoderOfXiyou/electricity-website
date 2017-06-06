!function function_name() {
	window.onload=function () {
		var $sinBtn = $(".single-select")
		var $allBtn = $(".all-select")
		var $addBtn = $(".countReduce")
		var $reduceBtn = $(".countAdd")
		var $sinCon = $(".conSin")
		var $payBtn = $(".footer-right")

		$sinBtn.click(function () {
			var $this = $(this)
			// alert(0)
			//get this data-select
			var selectBool = parseInt($this.attr("data-select"))
			if (selectBool) {
				$this.removeClass("select-yes")
				$this.attr("data-select" , '0')
			}
			else{
				$this.addClass("select-yes")
				$this.attr("data-select" , "1")
			}

			caculateCountAndPrice()
		})//end select click

		$allBtn.click(function () {
			var $this = $(this)
			// alert(0)
			//get this data-select
			var selectBool = parseInt($this.attr("data-select"))
			if (selectBool) {
				$allBtn.removeClass("select-yes")
				$allBtn.attr("data-select" , '0')
				$sinBtn.removeClass("select-yes")
				$sinBtn.attr("data-select" , '0')
			}
			else{
				$allBtn.addClass("select-yes")
				$allBtn.attr("data-select" , '1')
				$sinBtn.addClass("select-yes")
				$sinBtn.attr("data-select" , '1')
			}	

			caculateCountAndPrice()
		})


		//add and reduce the count of goods
		$addBtn.bind("click" , function () {
			var $input = $(this).parent().find("input")
			var $myReduceBtn = $(this).parent().find(".countAdd")
			var inputValue = $input.val()
			 inputValue++
			$input.val(inputValue)
			$myReduceBtn.css("color" , "#000")
			caculateCountAndPrice()
			// console.log($input)
		})

		$reduceBtn.bind("click" , function () {
			var $input = $(this).parent().find("input")
			var inputValue = $input.val()
			if (inputValue == 1) {
				$(this).css("color" , "#999")
			}else{
			 	inputValue--
			}
			$input.val(inputValue)
			caculateCountAndPrice()
			// console.log($input)	
		})

		$payBtn.bind("click" , function () {
			var sinLen = $sinCon.length
			var sendallObj = {}
			var paylistObj = {}
			var wantUpdateObj={}
			var wantUpdateArray = []
			paylistObj.paylist = []
			paylistObj.payCount = 0
			paylistObj.payPrice = 0
			for(var i=0; i < sinLen ; i++){
				$this = $($sinCon[i])
				var sinCheck = parseInt($this.find(".single-select").attr("data-select"))
				temp = {}
					var sinCount = parseInt($this.find(".countNumber").val())
					var sinPrice = parseFloat($this.find(".nowprice").text().substr(1))
					var sinName = $this.find(".goodsName").text()
					var sinSrc = $this.find(".conSin-middle>img").attr("src")
					var sinStand = $this.find(".conSin-right>.standard").text()
					// console.log("count is:\n"+allGCount)

				if (sinCheck) {
					temp.count = sinCount
					temp.price = sinPrice
					temp.name = sinName
					temp.src= sinSrc
					temp.stand = sinStand
					paylistObj.paylist.push(temp)
				}
				else{
					var gid = $this.attr("data-gid")
					var standardArray = []
					var $standGroup = $this.find(".conSin-hide-stand")
					for(var j=0 , leng = $standGroup.length ; j < leng ; j++){
						var tempObj = {}
						var tempStandName = $($standGroup[j]).find(".conSin-hide-standname").text()
						var $tempStanItem = $($standGroup[j]).find(".conSin-hide-standitem")
						var tempStanItemArray = []
						for(var k=0 , lengt = $tempStanItem.length ; k < lengt ; k++){
							tempStanItemArray.push($($tempStanItem[k]).text())
						}
						tempObj.name = tempStandName
						tempObj.items = tempStanItemArray
						standardArray.push(tempObj)
					}
					wantUpdateObj.count = sinCount
					wantUpdateObj.nowprice = sinPrice
					wantUpdateObj.name = sinName
					wantUpdateObj.imgsrc = sinSrc
					wantUpdateObj.stand = sinStand
					wantUpdateObj.id = gid
					wantUpdateObj.standard = standardArray
					wantUpdateArray.push(wantUpdateObj)
				}
			}//for end
			var allGPrice = $("#footer-price").text()
			var allGCount = $(".footer-right-count").text()
			paylistObj.payCount = allGCount
			paylistObj.payPrice = allGPrice
			sendallObj.paylist = paylistObj
			sendallObj.wantsUpdate = wantUpdateArray
			console.log(sendallObj)
			$.post("/paylistAjax" , sendallObj , function (req) {
				if (req.back) {
					console.log("i could go to pay ")
					window.location.href="/mpay"
				}
			})
		})//end paybtn click

		function caculateCountAndPrice() {
			// body...
			var sinLen = $sinCon.length
			var allGCount = 0
			var allGPrice = 0
			for(var i=0;i<sinLen;i++ ){
				$this = $($sinCon[i])
				var sinCheck = parseInt($this.find(".single-select").attr("data-select"))
				if (sinCheck) {
					var sinCount = parseInt($this.find(".countNumber").val())
					var sinPrice = parseFloat($this.find(".nowprice").text().substr(1))
					allGCount += sinCount
					// console.log("count is:\n"+allGCount)
					allGPrice+=sinCount * sinPrice
				}
			}
			$("#footer-price").text(allGPrice)
			$(".footer-right-count").text(allGCount)
		}
		caculateCountAndPrice()
	}	//end window onload
}()