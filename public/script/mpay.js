!function () {
	window.onload = function () {
		// console.log(9)\
		$(".footerSubmit").bind("click" , function () {
			var rName = $(".headerRecePerName").text().substr(4)
			var rPhone = $(".headerRecePerPhone").text()
			var rAddress = $(".header-receiver-locCon").text()
			var sendObj = {}
			sendObj.receiverName = rName
			sendObj.receiverPhone = rPhone
			sendObj.receiverAddress = rAddress
			console.log(sendObj)
			$.post("/payAjax" , sendObj , function (res) {
				if (res.back) {
					$(".masker").css("display" , "block")
					var timer1 = window.setInterval(function () {
						window.location.href="/mindex"
					} , 2000)
				}
			})
		})
	}	
}()