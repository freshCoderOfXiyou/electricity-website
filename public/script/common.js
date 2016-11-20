(function() {
	$().ready(
		
		function () {


			var $fixsearch=$('#fixBox')
			var $toUpButton=$("#toUpButton")
			var $userButton=$('.menubarUp .glyphicon-user')
			var $menubar=$('.menubar')
			// $menubar.hide()
			// console.log($userButton.innerHTML())
			window.addEventListener('scroll', function () {
				var stop=document.documentElement.scrollTop || document.body.scrollTop
				if(stop>800){
					$fixsearch.addClass('fixSearchBoxShow')
					$toUpButton.css('display','block')
				}
				else{
					$fixsearch.removeClass('fixSearchBoxShow')
					$toUpButton.css("display",'none')
				}
			}, false)

			//scroll to top
			$toUpButton.click(function () {
				var stop=document.documentElement.scrollTop || document.body.scrollTop
				var SPEED=60
				var timer=setInterval(function () {
						if(document.documentElement.scrollTop){
							document.documentElement.scrollTop-=SPEED
							stop=document.documentElement.scrollTop || document.body.scrollTop
						}
						else{
							document.body.scrollTop-=SPEED
							stop=document.documentElement.scrollTop || document.body.scrollTop																																																																										
						}
						if(stop==0){
							clearInterval(timer)
						}
						if(SPEED>20){
							SPEED=SPEED-2
						}
					}, 10)
			})


			$menubar.bind('click',function(event) {
				var sourceElement=event.target||window.event.srcElement
				var sourceName=sourceElement.className
				if (sourceName=='.glyphicon .glyphicon-chevron-up') {
					return
				}
				else{
					$('.fixSidebar').addClass('fixSidebarShow')
				}
			})

			// $('body').bind('click',function  () {
			// 	$('.fixSidebar').removeClass('fixSidebarShow')
			// })




		}
		)
})()
