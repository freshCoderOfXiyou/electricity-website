(function () {
	window.onload=function () {
		var screenWidth=$(window).width()
		// console.log(document.body.scrollWidth)
		var setpmove=screenWidth/10
		var header_focus_item='header-info'
		var focus_id=1
		var clickbtn=1
		// var transx=0
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
						console.log(now_css_left)
						if (move_dis == move_lenth) {
							clearInterval(timer)
							// console.log(move_dis)
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
		/*define a handle */
		function handlestart (e) {
			if(e.touches.length!==1){
				return
			}
			startX=e.touches[0].pageX
			startY=e.touches[0].pageY
			slidewrap.addEventListener('touchmove',handlemove,false)
			// console.log("sx is: "+ startX+"sy is : " + startY)
		}	

		function handlemove (e) {
			transX = - page * screenWidth
			// console.log("page:"+(-page * screenWidth))
			slideInner.style.transform="translate3d("+transX+"px,0,0)"
			var touches=e.touches
			if (touches&&touches.length) {
				distanceX=startX-touches[0].pageX
				// console.log("distanceX :"+distanceX)
				// console.log("handlemove"+transX)
				if ((page == 0 && distanceX < 0) || (page == (listUlLen - 1) && distanceX > 0)) {
					distanceX=distanceX / 3
				}
				var transX=-distanceX-page * screenWidth
				slideInner.style.transform="translate3d("+transX+"px,0,0)"
			}
			e.preventDefault()
		}	

		function handleend(argument) {
			transX=- page * screenWidth - distanceX
			var move_time =1
			var move_dis=8
			console.log("move end")
				if ((page == 0 && distanceX < 0) || (page == (listUlLen - 1) && distanceX > 0)) {
					transX=- page * screenWidth
					slideInner.style.transform="translate3d("+transX+"px,0,0)"
					return
				}
				if (distanceX>=100) {
					listUl[page].style.background="#e0e0e0"
					page++
					listUl[page].style.background="#c40000"
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

	}//the all most outer
})()