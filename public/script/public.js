// param direction:true mean up,false mean down
// 纵向的滚动
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
//获取飞入动画对应的起始元素的坐标值
var sourceX=sourceEle.offset().left
var sourceY=sourceEle.offset().top
//获取飞入动画对应的结束元素的坐标值
var destinationX=destinaEle.offset().left
var destinationY=destinaEle.offset().top
//计算得到飞入动画在横向与纵向移动的距离
var disX=destinationX-sourceX
var disY=destinationY-sourceY
//飞行时间取100个计时器间隔时间，计算得到横向飞行速度
var speedX=disX/100
var speedY=0
var accerY=0
//结束元素有可能在起始元素的上方，也有可能在起始元素的下方，分别计算纵向的初始速度和加速度
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
//创建定时器，每隔15毫秒执行一次，由于浏览器的性能问题不是真正的15毫秒应该是大于15毫秒，
//这里使用一个较小的时间间隔就可以在单位时间内执行更多次的移动，从而使飞入动画更加流畅
var timer=window.setInterval(function(){
	nowX+=speedX
	speedY+=accerY
	// console.log(accerY,speedY)
	nowY+=speedY
	newEle.css('top',nowY)
	newEle.css('left',nowX)
	//当飞动元素的横坐标值已经大于飞行的横向距离就清空定时器
	if (nowX>disX) {
		clearInterval(timer)
		var temPen=document.getElementById(newEle.attr('id'))
		temPen.parentNode.removeChild(temPen)
		//在结束时设置结束元素样式变为红色，并使用定时器在100毫秒之后设置为原来的背景色，从而加强了飞入的动画效果
		destinaEle.css('color','#c40000')
		setTimeout(function  () {
			destinaEle.css('color','white')
		}, 100)
	}
},15)
}
