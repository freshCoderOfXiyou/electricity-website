// param direction:true mean up,false mean down
function publicRoll(node,direction) {
	// debugger
	var selfHeight=parseInt(node.css('height'))
	var selfTop=parseInt(node.css('top'))
	var parentNode=node.parent()
	var parentHeight=parseInt(parentNode.css('height'))

	var scrollTimes=parseInt(selfHeight/parentHeight)
	var singleSrcollHeight=selfHeight/scrollTimes
	// console.log('times',(scrollTimes--))
	if (direction) {
		if (-selfTop/singleSrcollHeight==(scrollTimes-1)){
		var reverseDireTimer=setInterval(function (e) {
			selfTop+=6
			node.css('top',selfTop+'px')
			if (selfTop>=0) {
				clearInterval(reverseDireTimer)
				// console.log(-selfTop/singleSrcollHeight)
			}
		},1)
		}else{
			var timer=setInterval(function  () {
				selfTop-=6
				node.css('top',selfTop+'px')
				if (-selfTop%singleSrcollHeight==0) {
					clearInterval(timer)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},3)
		}
	}//end if
	else {
		if (selfTop>=0){
			var reverseDireTimer2=setInterval(function (e) {
				selfTop-=6
				node.css('top',selfTop+'px')
				if (selfTop<=-singleSrcollHeight*(scrollTimes-1)) {
					clearInterval(reverseDireTimer2)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},1)
		}else{
			var timer2=setInterval(function  () {
			
				selfTop+=6
				node.css('top',selfTop+'px')
				if (-selfTop%singleSrcollHeight==0) {
					clearInterval(timer2)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},3)
		}
		
	}//end else	
}

//因为收藏功能和加入购物车功能在处理逻辑是很多相同的地方，
		//所以把飞入效果做成一个function，传入的参数点击元素，新元素以及目标元素
		function flyTo(sourceEle,destinaEle,newEle) {
			// body...
			var sourceX=sourceEle.offset().left
			var sourceY=sourceEle.offset().top
			var destinationX=destinaEle.offset().left
			var destinationY=destinaEle.offset().top
			var disX=destinationX-sourceX
			var disY=destinationY-sourceY
			var speedX=disX/100
			var speedY=0
			var accerY=0
			if (disY>0) {
				speedY=15
				accerY=(disY-speedY*100)*2/10000
			}
			else{
				speedY=-15
				accerY=(disY-speedY*100)*2/10000
			}
			// accerY=(disY+15*100)*2/10000
			// console.log('dis',disY,'speed',speedY,'accerY',accerY)
			var nowX=0
			var nowY=0
			var timer=window.setInterval(function(){
				nowX+=speedX
				speedY+=accerY
				// console.log(accerY,speedY)
				nowY+=speedY
				newEle.css('top',nowY)
				newEle.css('left',nowX)
				if (nowX>disX) {
					clearInterval(timer)
					var temPen=document.getElementById(newEle.attr('id'))
					temPen.parentNode.removeChild(temPen)
					destinaEle.css('color','#c40000')
					setTimeout(function  () {
						destinaEle.css('color','white')
					}, 100)
				}
			},15)
		}