(function () {
	$().ready(function () {
		var $images=$('#images')
		var imagesCount=$images.children('a').length

		// var imageWidth=$images.children('a').width()
		var imageWidth=$images.width()
		var singleImageWidth=$images.find('img').width()
		var lastImageLeft=-singleImageWidth*(imagesCount-1)
		var nowIndex=0
		var oldIndex=1
		$('#bt1').css("background",'rgba(255,255,255,0.58)')
		// console.log(nowLeft)
		// $images.css('left','-100px')
		console.log("$images")
		window.setInterval(function () {
			var nowLeft=parseInt($images.css('left'))
			var nextLeft=nowLeft-singleImageWidth
			nowIndex=-nowLeft/singleImageWidth
			console.log(nowIndex+' left is:'+nextLeft)

			//image move
			if (nextLeft<=lastImageLeft) {
				$images.css('left',-singleImageWidth+'px')
			}else{
				$images.css('left',nextLeft+'px')
			}
			//buttons move
			$("#bt"+oldIndex).css('background','rgba(10, 10, 10, 0.58)')
			switch (nowIndex) {
				case 1:
					$('#bt2').css("background",'rgba(255,255,255,0.58)')
					oldIndex=2
					break;
				case 2:
					$('#bt3').css("background",'rgba(255,255,255,0.58)')
					oldIndex=3
					break;
				case 3:
					$('#bt4').css("background",'rgba(255,255,255,0.58)')
					oldIndex=4
					break;
				case 4:
					$('#bt5').css("background",'rgba(255,255,255,0.58)')
					oldIndex=5
					break;
				case 5:
					$('#bt6').css("background",'rgba(255,255,255,0.58)')
					oldIndex=6
					break;
				case 6:
					$('#bt1').css("background",'rgba(255,255,255,0.58)')
					oldIndex=1
					break;
				default:
					// statements_def
					break;
			}
		}, 3000)

		// $(".buttons").bind('click',function () {
		// 	alert("123")
		// })
		// $images.bind('click',function () {
		// 	alert('456')
		// })
		// $(".commodityDetail").bind('click',function () {
		// 	alert('789')
		// })
	})
})()