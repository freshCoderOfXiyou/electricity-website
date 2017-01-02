(function () {
	$().ready(function  () {
		
		$('#input-usrname').bind('input propertychange', function () {
			console.log($('#input-usrname').val())
		})
		$('#input-psw').bind('input propertychange', function () {
			console.log($('#input-psw').val())
		})
		$('#input-pswconfirm').bind('input propertychange', function () {
			console.log($('#input-pswconfirm').val())
		})
		$('#input-mail').bind('input propertychange', function () {
			console.log($('#input-mail').val())
		})
		$('#input-phone').bind('input propertychange', function () {
			console.log($('#input-phone').val())
		})
		$('#input-img').bind('input propertychange', function () {
			console.log($('#input-img').val())
		})
		$('#input-phoneNumber').bind('input propertychange', function () {
			console.log($('#input-phoneNumber').val())
		})






	})//end of ready function
})()//end of function
