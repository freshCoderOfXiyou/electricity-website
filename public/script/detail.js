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
		var iconEle=document.createElement("i")
		iconEle.className='has-select'
		function selectNode(snode) {
			//judge the brother node has been selected
			var siblings=snode.sibling
			
			snode.addClass('')
		}
		// $('.selec').append(iconEle)
	}//end onload
})()