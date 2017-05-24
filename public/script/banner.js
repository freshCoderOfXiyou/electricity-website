
function imagesmove ($node) {
	// body... 
	var imagesCount=$node.children('a').length
	var imageWidth=$node.width()
	var singleImageWidth=$node.find('img').width()
	var lastImageLeft=-singleImageWidth*(imagesCount-1)
	var nowIndex=0
	var oldIndex=1
	var colors = ["#936FAF","#8D0706","#5CA498","#FF0041","#AE1330","#9C899D"]
	
	$(".indexBanner").css("background" , colors[0])
	$('#bt1').css("background",'rgba(255,255,255,0.8)')
	window.setInterval(function () {
		var imagesCount=$node.children('a').length
		var imageWidth=$node.width()
		var singleImageWidth=$node.find('img').width()
		var lastImageLeft=-singleImageWidth*(imagesCount-1)
		var nowLeft=parseInt($node.css('left'))
		var nextLeft=nowLeft-singleImageWidth
		nowIndex=-nowLeft/singleImageWidth

		//image move
		if (nextLeft<=lastImageLeft) {
			$node.css('left',-singleImageWidth+'px')
		}else{
			$node.css('left',nextLeft+'px')
		}

		//buttons move
		$("#bt"+oldIndex).css('background','rgba(10, 10, 10, 0.58)')
		switch (nowIndex) {
			case 1:
				$('#bt2').css("background",'rgba(255,255,255,0.8)')
				oldIndex=2
				break;
			case 2:
				$('#bt3').css("background",'rgba(255,255,255,0.8)')
				oldIndex=3
				break;
			case 3:
				$('#bt4').css("background",'rgba(255,255,255,0.8)')
				oldIndex=4
				break;
			case 4:
				$('#bt5').css("background",'rgba(255,255,255,0.8)')
				oldIndex=5
				break;
			case 5:
				$('#bt6').css("background",'rgba(255,255,255,0.8)')
				oldIndex=6
				break;
			case 6:
				$('#bt1').css("background",'rgba(255,255,255,0.8)')
				oldIndex=1
				break;
			default:
				// statements_def
				break;
		}
				$(".indexBanner").css("background" , colors[oldIndex-1])
	}, 2000)
}