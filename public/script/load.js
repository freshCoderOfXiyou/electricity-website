(function () {
	$().ready(function  () {
		var choose=false
		$('.load-choose-form').click(function  (e) {
			if (choose) {
				var nowloc=-285
				var speed=5
				var timer=setInterval(function () {
					nowloc+=speed
					$('.load-wrap-inner').css('left',nowloc+'px')
					if (nowloc==0) {
							clearInterval(timer)
					}
				}, 1)
				$('.load-wrap-inner').css('left','0')
				$(this).addClass('load-choose-select')
				$('.load-choose-scan').removeClass('load-choose-select')
				choose=false	
			}
		})
		
		$('.load-choose-scan').click(function  (e) {
			if (!choose) {
				var nowloc=0
				var speed=-5
				var timer=setInterval(function () {
					nowloc+=speed
					$('.load-wrap-inner').css('left',nowloc+'px')
					if (nowloc==-285) {
							clearInterval(timer)
					}
				}, 1)
				$(this).addClass('load-choose-select')
				$('.load-choose-form').removeClass('load-choose-select')
				choose=true
			}
						
		})
	})//end ready
})()