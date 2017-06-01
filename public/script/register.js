(function () {
	$().ready(function  () {
		
		// $('#input-usrname').bind('input propertychange', function () {
		// 	console.log($('#input-usrname').val())
		// })
		// $('#input-psw').bind('input propertychange', function () {
		// 	console.log($('#input-psw').val())
		// })
		// $('#input-pswconfirm').bind('input propertychange', function () {
		// 	console.log($('#input-pswconfirm').val())
		// })
		// $('#input-mail').bind('input propertychange', function () {
		// 	console.log($('#input-mail').val())
		// })
		// $('#input-phone').bind('input propertychange', function () {
		// 	console.log($('#input-phone').val())
		// })
		// $('#input-img').bind('input propertychange', function () {
		// 	console.log($('#input-img').val())
		// })
		// $('#input-phoneNumber').bind('input propertychange', function () {
		// 	console.log($('#input-phoneNumber').val())
		// })

		$("#submit").bind("click" , function(){
			var temp = {}
			temp.id = $("#input-uphone").val()
			temp.name = $('#input-usrname').val()
			temp.psw = $('#input-psw').val()
			temp.phone = $("#input-uphone").val()
			temp.src = './public/images/header.png'
			temp.receiver = []
			temp.wants = []
			var tempReceiver = {}
			tempReceiver.receiverName = $("#input-rname").val()
			tempReceiver.receiverPhone = $("#input-rphone").val() 
			tempReceiver.receiverAddress = $("#input-raddress").val()
			temp.receiver.push(tempReceiver)
			console.log(temp)
			$.post("/registerajax" , temp , function (res) {
				console.log(res)
				if (res.result) {
					window.location.href="/pcload"
				}
			})
		})




	})//end of ready function
})()//end of function
