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
			if (disY>0) {
				speedY=15
			}
			else{
				speedY=-15
			}
			var accerY=(disY+15*100)*2/10000
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

		// $('.buy-btn').click(function () {
		// 	popup('gray','100px','100px','','',$(this))
		// })
	}//end onload
})()