(function () {
	window.onload=function () {
		var screenWidth=$(window).width()
		// console.log(document.body.scrollWidth)
		var setpmove=screenWidth/10
		var header_focus_item='header-info'
		var focus_id=1
		var clickbtn=1
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
	}
})()