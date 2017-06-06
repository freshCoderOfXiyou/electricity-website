(function () {
	window.onload=function () {


		// alert(0)

		var screenWidth=$(window).width()
		$(".info-selec").css("display","none")
		// console.log(document.body.scrollWidth)
		var setpmove=screenWidth/10
		// console.log(setpmove)
		var header_focus_item='header-info'
		var focus_id=1
		var clickbtn=1
		// var transx=0
		// $(".info").css("height","5rem")
		var infoH=$(".info").css("height")
		var moreH=$(".more").css("height")
		var commentH=$(".comment").css("height")
		var $addShopcart = $(".info-selec-yes")
		var $btnarea = $(".info-selec-btns1")
		var $btntit = $(".info-selec-btntitle")
		var $btnSelected = $(".btn-selected")
		var $infoSeTieFirst = $(".infoSeTie-first")
		var $input = $(".number-input")

		// console.log($btnarea.get(1))


		$('.middle').css("height" , infoH)
		$(".middle-outer").css("height" , infoH)
		// console.log(infoH)
//点击头部标题“基本信息”的监听事件
$('#header-info').click(function () {
//若点击此时显示选项卡自己的按钮，则不执行任何操作
if (header_focus_item==$(this).attr('id')) {
	return
}
clickbtn=1
//调用slide函数，传入的值为当前的选项卡id以及目标的id
slide(focus_id,clickbtn)
focus_id=1
//改变此按钮的样式，是用户能够清楚了解此时查看的是哪一个选项卡
$(this).addClass('header-focus')
//改变此前选中选项卡对应按钮的样式，使其成为普通选项卡按钮
$("#"+header_focus_item).removeClass('header-focus')
header_focus_item='header-info'
})

//点击头部“商品详情”的监听事件，执行的操作和点击“基本信息”类同
$('#header-more').click(function () {
if (header_focus_item==$(this).attr('id')) {
	return
}
clickbtn=2
slide(focus_id,clickbtn)
focus_id=2
$(this).addClass('header-focus')
$("#"+header_focus_item).removeClass('header-focus')
header_focus_item='header-more'
})

//点击头部“评价”的监听事件，执行的操作和点击“基本信息”类同
$('#header-comment').click(function () {
if (header_focus_item==$(this).attr('id')) {
	return
}
clickbtn=3
slide(focus_id,clickbtn)
focus_id=3
$(this).addClass('header-focus')
$("#"+header_focus_item).removeClass('header-focus')
header_focus_item='header-comment'
})
		// $("#header-comment").click()

		
//在此函数中使用switch语句来进行判断可以使用更加简洁的代码，直接调用函数move并传入dis值，需要简单调整下move函数的实现
//function slide 
//根据起始的位置以及最终的位置来调用函数move
function slide(nowPosId,nextPosId) {
//获取当前点击的头部按钮的id值与此前选中头部按钮的id值
//使用两者相减得到差值
var dis=nextPosId - nowPosId
//使用switch语句根据不同的差值执行不同的调用
switch(dis){
	case 1:
		//slide to left 10rem
		//如果差值为1则向左滑动一屏的距离
		move(-1 , screenWidth)
		break
	case -1:
		//slide to right 10rem
		//如果差值为-1则右滑动一屏距离
		move(1 , screenWidth)
		break
	case 2:
		//slide to left 20rem
		//如果差值为2则向左滑动两屏距离
		move(-1 , 2 * screenWidth)
		break
	case -2:
		//slide to right 20rem
		//如果差值为-2则向右滑动两屏距离
		move(1 , 2 * screenWidth)
		break
}
}

//@param direc :-1 mean sliding to left,1 mean sliding to right
//执行具体的元素移动的函数，direc表示方向，-1表示向左滑动，1表示向右滑动
function move( direc , move_lenth) {
//用于记录移动的距离，当移动距离达到参数时停止计时器
var move_dis=0
//计时器的执行间隔时间
var move_time=20
//获取父元素的left值
var now_css_left=parseInt($('.middle').css('left'))
//开始执行计时器，使用一个作用于限于函数的变量来保存计时器对象
var timer=setInterval(function () {
//计算得到一次执行中的left值，当direc带有正负的信息可以决定移动的方向
now_css_left += direc * setpmove
//计算累计移动距离
move_dis +=setpmove
//设置父元素的left值
$('.middle').css('left',now_css_left + 'px')
//当移动完毕时，根据被点击的按钮来设置父元素的高度
if (Math.abs(move_dis - move_lenth) < 0.001 ) {
clearInterval(timer)
switch(focus_id){
case(1):
	$('.middle').css('left','0rem').css("height" , infoH)
	$(".middle-outer").css("height" , infoH)
	console.log($(".middle-outer").css("height"))
	break
case(2):
	$('.middle').css('left','-10rem').css("height" , moreH)
	$(".middle-outer").css("height" , moreH)
	console.log($(".middle-outer").css("height"))
	break
case(3):
	$('.middle').css('left','-20rem').css("height" , commentH)
	$(".middle-outer").css("height" , commentH)
	console.log($(".middle-outer").css("height"))
	break
default:
	break
}
//将页面设置到最顶部，因为子元素高度不统一的缘故
window.scrollTo(0,0)
}		
},move_time)//end timer
}//end func move
		// slide(1,2)

		// @begin finger js
		var slidewrap=document.getElementsByClassName("piclist-outer")[0]
		var slideInner= document . getElementsByClassName("piclist-inner")[0]
		var page=0
		var distanceX=0
		var transX=0
		var listUl=document.getElementsByClassName("piclist-signal")[0].getElementsByTagName("li")
		var listUlLen=listUl.length
		// var listUl=document.getElementsByClassName("piclist-signal")[0]
		// console.log(listSin) 
//触摸的开始事件的处理函数
function handlestart (e) {
	if(e.touches.length!==1){
		return
	}
	//获取触摸时的横纵坐标
	startX=e.touches[0].pageX
	startY=e.touches[0].pageY
	slidewrap.addEventListener('touchmove',handlemove,false)
	// console.log("sx is: "+ startX+"sy is : " + startY)
}	

//触摸的移动事件处理函数
function handlemove (e) { 
	transX = - page * screenWidth
	// console.log("page:"+(-page * screenWidth))
	slideInner.style.transform="translate3d("+transX+"px,0,0)"
	var touches=e.touches
	if (touches&&touches.length) {
		distanceX=startX-touches[0].pageX
		// console.log("distanceX :"+distanceX)
		// console.log("handlemove"+transX)
		//如果当前是第一张幻灯或者最后一张幻灯，则让滑动速度降为原来的三分之一，已到达提示用户已不可滑动。
		if ((page == 0 && distanceX < 0) || (page == (listUlLen - 1) && distanceX > 0)) {
			distanceX=distanceX / 3
		}
		//通过改变transform属性值来达到移动的效果
		var transX=-distanceX-page * screenWidth
		slideInner.style.transform="translate3d("+transX+"px,0,0)"
	}
	e.preventDefault()
}	

//触摸的结束事件处理函数
function handleend(argument) {
	transX=- page * screenWidth - distanceX
	var move_time =1
	var move_dis=8
	// console.log("move end")
	//如果是第一张幻灯并向左滑动或者最后一张幻灯向右滑动的情况下，在滑动结束时显示原先的幻灯不发生改变
	if ((page == 0 && distanceX < 0) || (page == (listUlLen - 1) && distanceX > 0)) {
		transX=- page * screenWidth
		slideInner.style.transform="translate3d("+transX+"px,0,0)"
		return
	}
	//如果滑动的距离大于100px，则向右切换幻灯片
	if (distanceX>=100) {
		listUl[page].style.background="#e0e0e0"
		page++
		listUl[page].style.background="#c40000"
		//通过定时器实现滑动的动画效果
		var timer=setInterval(function () {
			slideInner.style.transform="translate3d("+transX+"px,0,0)"
			transX-=move_dis
			// console.log("transX:"+transX)
			// console.log("page:"+-page*(screenWidth + 1))
			if (transX <= -page * (screenWidth + 1)) {
				clearInterval(timer)
			}
		},move_time)
	}
	//如果滑动距离小于100px，则向左切换幻灯片
	else if (distanceX<=-100) {
		listUl[page].style.background="#e0e0e0"
		page--
		listUl[page].style.background="#c40000"
		var timer=setInterval(function () {
			slideInner.style.transform="translate3d("+transX+"px,0,0)"
			transX+=move_dis
			// console.log("transX:"+transX)
			// console.log("page:"+-page*(screenWidth + 1))
			if (transX >= -page * (screenWidth + 1)) {
				clearInterval(timer)
			}
		},move_time)
	}
	//如果滑动的距离没有达到临界的距离则不切换
	else{
		transX=- page * screenWidth
		slideInner.style.transform="translate3d("+transX+"px,0,0)"
	}
}


		function setList(num){
			for(var i=0,len=listSin.length;i < len;I++){

			}
		}
		slidewrap.addEventListener('touchstart',handlestart,false)
		slidewrap.addEventListener("touchend",handleend,false)

		//add goods to shoppingcart
		$(".selec .text-btn").click(addToCart)
		$(".footer-btn-addToCart").click(addToCart)
		function addToCart(argument) {
			$(".cover").css("display","block")
			$(".info-selec").css("display","block")
			$(".info-selec").addClass("show")
		}
		$(".cover").bind("click",function(event) {
			// console.log(event.target)
			if ( event.target == $(".cover")[0] ) {
				closeCover()
			}
		})

		$(".info-selec-close").click(closeCover)
		// addToCart()

		function closeCover() {
			$(".cover").css("display","none")
			$(".info-selec").removeClass("show")
			$(".info-selec").css("display","none")
		}

		//select button js
		$(".info-selec-btns1>span").click(function () {
			var $this=$(this)
			var selectValue=$this.text()
			var $thisParent = $this.parent()
			var parIndex = $thisParent.attr("data-index")-1
			 $($infoSeTieFirst.get(parIndex)).text(selectValue)
			// console.log($thisParent.attr("data-index"))

			$this.siblings().removeClass("btn-selected")
			$this.addClass("btn-selected")

			// var selectValue=$this.text()
			// $($(".infoSeTie-haschoose>span").get("1")).text(selectValue)
		})


		// $(".info-selec-btns2>span").click(function () {
		// 	var $this=$(this)
		// 	$this.siblings().removeClass("btn-selected")
		// 	$this.addClass("btn-selected")
		// 	var selectValue=$this.text()
		// 	$($(".infoSeTie-haschoose>span").get("2")).text(selectValue)
		// })
		$(".number-addBtn").click(function () {
			var value =parseInt($input.attr("value"))
				value++
				$input.attr("value",value )
				if (value>1) {
					$(".number-decreaseBtn").removeClass("btn-unable")
				}
			
		})

		$(".number-decreaseBtn").click(function () {
			var value =parseInt($input.attr("value"))
			if (value>1) {
				value--
				$input.attr("value",value )
			}else{
				return
			}
			if (value<=1) {
				$(this).addClass("btn-unable")
			}	
		})

		// $(".footer-btn-buyNow").bind("click" , function(){
		// 	var sendObj = {
		// 		wantsUpdate:[]
		// 	}

		// })

		$addShopcart.click(function () {
			var standLen = $btntit.length-1
			var msg = ""
			var imgsrc = $($(".piclist-inner>img").get(0)).attr("src")
			var name = $(".info-info-title").text()
			var id = $(".info-info").attr("data-gid")
			var nowprice = $(".info-info-price").text().substr(1)
			for(var i=0;i<standLen;i++){
				var msgTil = $($btntit.get(i)).text()
				var msgCon = $($infoSeTieFirst.get(i)).text()
				msg += msgTil+":"+ msgCon + ";"
			}
			var count = $input.val()
			var dataObj = {}
			dataObj.count = count
			dataObj.stand = msg
			dataObj.name = name
			dataObj.id = id
			dataObj.imgsrc = imgsrc
			dataObj.nowprice = nowprice
			console.log(dataObj)
			$.post("/addwantsAjax" , dataObj , function(res){
				if (res.back) {
					// console.log(res)
					$(".masker").css("display" , "block")
					// $(".cover").css("display" , "none")
					var timer1=setTimeout(function () {
						$(".masker").css("display" , "none")
					} , 2000)

					var timer2=setTimeout(function () {
						$(".cover").css("display" , "none")
					} , 1000)

				}

			})

		})

	}//the all most outer
})()
