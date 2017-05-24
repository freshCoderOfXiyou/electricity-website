(function() {
	$().ready(
		
		function () {


			var $fixsearch=$('#fixBox')
			var $toUpButton=$("#toUpButton")
			var $userButton=$('.menubarUp .glyphicon-user')
			var $menubar=$('.menubar')
			var sideshow=false
			var $detailDivs=$(".detailDiv")
			var $floorgide=$(".floor-gide")
			// $menubar.hide()
			// console.log($userButton.innerHTML())
			window.addEventListener('scroll', function () {
				var stop=document.documentElement.scrollTop || document.body.scrollTop
				if(stop>800){
					$fixsearch.addClass('fixSearchBoxShow')
					$toUpButton.css('display','block')
					$floorgide.css("display" , 'block')
				}
				else{
					$fixsearch.removeClass('fixSearchBoxShow')
					$toUpButton.css("display",'none')
					$floorgide.css("display"  , "none")
				}
			}, false)

			//scroll to top
			$toUpButton.click(function () {
				var stop=document.documentElement.scrollTop || document.body.scrollTop
				var SPEED=stop/30
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
						if(SPEED>400){
							console.log(SPEED)
							SPEED=SPEED/2	
						}
					}, 1)
			})


			$menubar.bind('click',function(event) {
				var sourceElement=event.target||window.event.srcElement
				var sourceName=sourceElement.className
				if (sourceName=='glyphicon glyphicon-chevron-up') {
					return
				}
				else{
					$('.fixSidebar').addClass('fixSidebarShow')
					sideshow=true
					
					switch (sourceName) {
						case 'glyphicon glyphicon-user':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#user').addClass('detailDivShow')
							break;
						case 'glyphicon glyphicon-shopping-cart':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#shoppingCart').addClass('detailDivShow')
							break;
						case 'glyphicon glyphicon-heart-empty':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#heart').addClass('detailDivShow')
							break;
						case 'glyphicon glyphicon-map-marker':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#map').addClass('detailDivShow')
							break;
						case 'glyphicon glyphicon-bell':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#bell').addClass('detailDivShow')
							break;
						case 'glyphicon glyphicon-edit':
							for (var i = $detailDivs.length - 1; i >= 0; i--) {
								$detailDivs[i].className='detailDiv'
							}
							$('#edit').addClass('detailDivShow')
							break;

						default:
							
							break;
					}
				}
			})

			// $('body').bind('click',function  () {
			// 	var sourceElement=event.currentTarget||window.event.srcElement
			// 	// if (sourceElement.className=='fixSidebar') {
			// 	// 	return
			// 	// 	console.log('123')
			// 	// }
			// 	// else{
			// 	// 	$('.fixSidebar').removeClass('fixSidebarShow')
			// 	// 	console.log('456')
			// 	// 	console.log(sourceElement.className+"789")
			// 	// }
			// 	if (sideshow) {
			// 		$('.fixSidebar').removeClass('fixSidebarShow')
			// 		sideshow=false
			// 		console.log('close')
			// 	}
			// })
			$('.removeIcon').bind('click',function () {
				$('.fixSidebar').removeClass('fixSidebarShow')
			})



		}
		)
})()
