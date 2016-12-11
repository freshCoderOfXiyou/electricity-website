(function  () {
	window.onload=function () {
		//toggle img 
		var $mainImg=$('.detail-img-main img')
		$('.detail-img-list>li>a>img').hover(function (e) {
			var targetEle=e.target
			$mainImg.attr('src',targetEle.getAttribute('src'))
			$('.manifyImg img').attr('src',targetEle.getAttribute('src'))
		})
		
		//magnify
		var $imgWrap=$('.detail-img-main')
		$imgWrap.mouseenter(function (e) {
			$('#imgLoc').css('display','block')
			$('.manifyImg').css('display','block')
			
		})
		$imgWrap.mouseleave(function (e) {
			$('#imgLoc').css('display','none')
			$('.manifyImg').css('display','none')
		})
		$imgWrap.mousemove(function (e) {
			var imgX=document.getElementById('imgMainWrap').getBoundingClientRect().left
			var imgY=document.getElementById('imgMainWrap').getBoundingClientRect().top
			// .getBoundingClientRect()
			// console.log(imgY)
			var cursorX=e.clientX-imgX
			var cursorY=e.clientY-imgY
			var maskX=(cursorX-106)+'px'
			var maskY=(cursorY-106)+'px'
			if (cursorX<106) {
				maskX='0px'
			}else if (cursorX>310) {
				maskX='200px'
			}
			if (cursorY<106) {
				maskY='0px'
			}else if (cursorY>310) {
				maskY='200px'
			}
			var maginfyX=-parseInt(maskX)*2+'px'
			var maginfyY=-parseInt(maskY)*2+'px'
			$('#imgLoc').css('left',maskX)
			$('#imgLoc').css('top',maskY)
			$('.manifyImg img').css('left',maginfyX)
			$('.manifyImg img').css('top',maginfyY)

		})	

		//select
		//业务逻辑需求：A初始化第一项要默认选中，B每个选项只能有一个被选中，C选中之后需要得到相应的数据
		
		var selecUl=$('.selec').parent()//.addClass('btn-select').append(iconEle)
		for (var i = selecUl.length - 1; i >= 0; i--) {
			var iconEle=document.createElement("i")
			iconEle.className='has-select'
			$(selecUl[i]).children().first().addClass('btn-select').append(iconEle)
		}

		$('.selec').click(function (e) {
			// alert(1)
			var siblings=$(this).parent().children('li')
			for (var i = siblings.length - 1; i >= 0; i--) {
				$(siblings[i]).removeClass('btn-select')
				$(siblings[i]).children('i').detach()
			}
			var iconEle=document.createElement("i")
			iconEle.className='has-select'
			$(this).addClass('btn-select')
			$(this).append(iconEle)
		})
		// $('.selec').append(iconEle)

		$("#collect").click(function (e) {
			var pentagramIcon=document.createElement('span')
			pentagramIcon.className='glyphicon glyphicon-star'
			pentagramIcon.id='penta'
			$pentagramIcon=$(pentagramIcon)
			$(this).append(pentagramIcon)
			var $sourceEle=$("#collect")
			var $destinaEle=$($('.menubarUp i').get(2))
			flyTo($sourceEle,$destinaEle,$pentagramIcon)
		})

		$('.shopcar-btn').click(function () {
			var imgSrc=$('.detail-img-list>li>a>img').get(0).getAttribute('src')
			var $imgIcon=$('<img>',{
				id:'cartImg',
				src:imgSrc
			})
			$(this).append($imgIcon)
			var $destinaEle=$('.menubarUp .glyphicon-shopping-cart')
			flyTo($(this),$destinaEle,$imgIcon)
		})

		$('.tap-cart').click(function (e) {
			var imgSrc=$('.detail-img-list>li>a>img').get(0).getAttribute('src')
			var $imgIcon=$('<img>',{
				id:'cartImg',
				src:imgSrc
			})
			$(this).append($imgIcon)
			var $destinaEle=$('.menubarUp .glyphicon-shopping-cart')
			flyTo($(this),$destinaEle,$imgIcon)
		})
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

		//在显示业务中遇到了大量需要弹出层的地方，这些弹出层大小不一，颜色不一，样式不一，内容不一。
		function popup(color,width,height,content,loc,parentNode) {
			var $node=$('<div>')
			$node.css('background-color',color)
			$node.css('width',width)
			$node.css('height',height)
			parentNode.append($node)
			// $node.css('',)
			// $node.css('',)
		}


		//scroll event
		window.addEventListener('scroll', function () {
				var stop=document.documentElement.scrollTop || document.body.scrollTop
				if(stop>1040){
					// $('.tap-wrap').addClass('fixSearchBoxShow')
					$('.tap-wrap').css('display','block')
				}
				else{
					// $fixsearch.removeClass('fixSearchBoxShow')
					$('.tap-wrap').css("display",'none')
				}
				
			}, false)
		var $oldEle=$('#detail-tap-info')
		var $oldBtn=$(".detail-btn-info")
		$('.detail-tap-head').click(function (e) {
			// debugger
			console.log(e.target.className)
			switch (e.target.className) {
				case 'detail-btn-info':
					
					$oldEle.css("display",'none')
					$('#detail-tap-info').css('display','block')
					$oldEle=$('#detail-tap-info')
					
					$oldBtn.parent().removeClass('detail-tap-selec')
					$(".detail-btn-info").parent().addClass('detail-tap-selec')
					$oldBtn=$(".detail-btn-info")
					break;
				case 'detail-btn-param':
					
					$oldEle.css("display",'none')
					$('#detail-tap-param').css('display','block')
					$oldEle=$('#detail-tap-param')
					
					$oldBtn.parent().removeClass('detail-tap-selec')
					$(".detail-btn-param").parent().addClass('detail-tap-selec')
					$oldBtn=$(".detail-btn-param")
					break;
				case 'detail-btn-advise':
					
					$oldEle.css("display",'none')
					$('#detail-tap-advise').css('display','block')
					$oldEle=$('#detail-tap-advise')
					
					$oldBtn.parent().removeClass('detail-tap-selec')
					$(".detail-btn-advise").parent().addClass('detail-tap-selec')
					$oldBtn=$(".detail-btn-advise")
					break;
				case 'detail-btn-service':
					
					$oldEle.css("display",'none')
					$('#detail-tap-service').css('display','block')
					$oldEle=$('#detail-tap-service')
					
					$oldBtn.parent().removeClass('detail-tap-selec')
					$(".detail-btn-service").parent().addClass('detail-tap-selec')
					$oldBtn=$(".detail-btn-service")
					break;
				case 'detail-btn-evaluate':
					
					$oldEle.css("display",'none')
					$('#detail-tap-evaluate').css('display','block')
					$oldEle=$('#detail-tap-evaluate')
					
					$oldBtn.parent().removeClass('detail-tap-selec')
					$(".detail-btn-evaluate").parent().addClass('detail-tap-selec')
					$oldBtn=$(".detail-btn-evaluate")
					break;
				default:
					
					break;
			}

			if (document.documentElement.scrollTop) {
				if (document.documentElement.scrollTop>1040) {
					document.documentElement.scrollTop=1041
				}			
			}
			else{
				if (document.body.scrollTop>1040) {
					document.body.scrollTop=1041
				}	
				
			}
		})
		// $('.buy-btn').click(function () {
		// 	popup('gray','100px','100px','','',$(this))
		// })

		// evaluate section
		$('.detail-tapEva-list li').click(function (e) {
			// alert(1)
			var $i=$(this).find('i').css('background')
			if ($i.indexOf('url')>=0) {
				$(this).find('i').css('background','none')
			}else {
				$(this).find('i').css('background','url("http://127.0.0.1:3000/style/style-icon/list-checked.png")  no-repeat 0px 0px')
			}
		})
		$('.detail-tapEva-select').hover(function (e) {
			// $('.detail-tapEva-options').css('display','block')
			// $(this).next().removeClass('glyphicon-chevron-down')
			// $(this).next().addClass('glyphicon-chevron-up')
			// console.log($(this).next())
			$('#detail-tapEva-opvalue').next().toggleClass('detail-tapEva-iconToggle')
		})
		$('.detail-tapEva-options').click(function (e) {
			var targetLi=e.target
			$('#detail-tapEva-opvalue').text($(targetLi).text())

		})
		var $detailTapEvaBtn=true
		$('.detail-tapEva-btn').click(function (e) {
			if ($detailTapEvaBtn) {
				$(this).css('background-position','0 -109px')
				$detailTapEvaBtn=false
			}
			else {
				$(this).css('background-position','0 -96px')
				$detailTapEvaBtn=true
			}
		})


		/*look repeatedly section*/
		var $rollNode=$('.detail-lookRepeatedly-absoluteDiv')
		$('.detail-lookRepeatedly-btn span:eq(0)').click(function (e) {
			// $('.detail-lookRepeatedly-absoluteDiv').css('top','')
			publicRoll($rollNode,false)
		})
		$('.detail-lookRepeatedly-btn span:eq(1)').click(function (e) {
			publicRoll($rollNode,true)
		})

		
	}//end onload
})()