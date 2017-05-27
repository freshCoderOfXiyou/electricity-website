// @mregister.js
!function () {
	window.onload = function () {
		// alert(1)
		var couldsee = false
		var $couldseeBtn = $(".sinInfo-input-exchange span")
		var $pwsInput = $("#pswInput")
		var $commitBtn = $(".commitBtn")
		var $nameInput = $("#nameInput")
		var $phoneInput = $("#phoneInput")
		var $addressInput = $("#addressInput")
		$(".sinInfo-input-exchange").bind("click" , function () {
			couldsee = couldsee ? false : true
			if (couldsee) {
				$couldseeBtn.removeClass("glyphicon-eye-close")
				$couldseeBtn.addClass("glyphicon-eye-open")
				$pwsInput.attr("type" , "text")
			}
			else{
				$couldseeBtn.removeClass("glyphicon-eye-open")
				$couldseeBtn.addClass("glyphicon-eye-close")
				$pwsInput.attr("type" , "password")
			}
		})


		$commitBtn.bind("click" , function () {
			var psw = $pwsInput.val()
			var name = $nameInput.val()
			var phone = $phoneInput.val()
			var address = $addressInput.val()
			var temp = {}
			temp.id = phone
			temp.name = name
			temp.psw = psw
			temp.phone = phone
			temp.src = "./public/images/header.png"
			var receiver = {}
			receiver.receiverName = name
			receiver.receiverPhone = phone
			receiver.receiverAddress = address
			temp.receiver = receiver
			console.log(temp)
			$.post("/registerajax" , temp , function (res) {
				console.log(res.result)
				if (res.result) {
					console.log("enter")
					window.location.href="/mload"
				}
			})
		})





	}	
}()