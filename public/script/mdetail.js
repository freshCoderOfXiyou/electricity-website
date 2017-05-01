(function () {
	window.onload=function () {
		var screenWidth=$(window).width()
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
		$('.middle').css("height" , infoH)
		$(".middle-outer").css("height" , infoH)
		console.log(infoH)
		$('#header-info').click(function () {
			// console.log($(this).attr('id'))
			if (header_focus_item==$(this).attr('id')) {
				return
			}
			clickbtn=1
			// debugger
			slide(focus_id,clickbtn)
			focus_id=1
			// $('.middle').css('left','0rem')
			$(this).addClass('header-focus')
			$("#"+header_focus_item).removeClass('header-focus')
			header_focus_item='header-info'
		})

		$('#header-more').click(function () {
			if (header_focus_item==$(this).attr('id')) {
				return
			}
			// debugger
			clickbtn=2
			slide(focus_id,clickbtn)
			focus_id=2
			// $('.middle').css('left','-10rem')
			$(this).addClass('header-focus')
			$("#"+header_focus_item).removeClass('header-focus')
			header_focus_item='header-more'
		})

		$('#header-comment').click(function () {
			if (header_focus_item==$(this).attr('id')) {
				return
			}
			// debugger
			clickbtn=3
			slide(focus_id,clickbtn)
			focus_id=3
			// $('.middle').css('left','-20rem')
			$(this).addClass('header-focus')
			$("#"+header_focus_item).removeClass('header-focus')
			header_focus_item='header-comment'

		})
		$("#header-comment").click()
		//function slide 
		function slide(nowPosId,nextPosId) {
			var dis=nextPosId - nowPosId
			// console.log(now_c)
			switch(dis){
				case 1:
					//slide to left 10rem
					move(-1 , screenWidth)
					break
				case -1:
					//slide to right 10rem
					move(1 , screenWidth)
					break
				case 2:
					//slide to left 20rem
					move(-1 , 2 * screenWidth)
					break
				case -2:
					//slide to right 20rem
					move(1 , 2 * screenWidth)
					break
			}
		}

		//@param direc :-1 mean sliding to left,1 mean sliding to right
		function move( direc , move_lenth) {
			var move_dis=0
			// var move_step=1
			var move_time=20
			var now_css_left=parseInt($('.middle').css('left'))
			// console.log(now_css_left)
			var timer=setInterval(function () {

						now_css_left += direc * setpmove
						move_dis +=setpmove
						$('.middle').css('left',now_css_left + 'px')
						// console.log("left:"+now_css_left)
						// console.log("actually move:"+move_dis)
						// console.log("expect move"+move_lenth)
						if (Math.abs(move_dis - move_lenth) < 0.001 ) {
							clearInterval(timer)
							// console.log(move_dis)
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
		$(".cover").click(closeCover)
		$(".info-selec-close").click(closeCover)
		function closeCover(argument) {
			$(".cover").css("display","none")
			$(".info-selec").removeClass("show")
			$(".info-selec").css("display","none")
		}
		// addToCart()

		//select button js
		$(".info-selec-btns1>span").click(function () {
			var $this=$(this)
			$this.siblings().removeClass("btn-selected")
			$this.addClass("btn-selected")
			var selectValue=$this.text()
			$($(".infoSeTie-haschoose>span").get("1")).text(selectValue)
		})
		$(".info-selec-btns2>span").click(function () {
			var $this=$(this)
			$this.siblings().removeClass("btn-selected")
			$this.addClass("btn-selected")
			var selectValue=$this.text()
			$($(".infoSeTie-haschoose>span").get("2")).text(selectValue)
		})
		$(".number-addBtn").click(function () {
			var $input=$(".number-input")
			var value =parseInt($input.attr("value"))
				value++
				$input.attr("value",value )
				if (value>1) {
					$(".number-decreaseBtn").removeClass("btn-unable")
				}
			
		})
		$(".number-decreaseBtn").click(function () {
			var $input=$(".number-input")
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

	}//the all most outer
})()
