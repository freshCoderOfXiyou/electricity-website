// @shopping cart js
(function () {
	$().ready(function  () {
		//rollbar section
		var $rollbar=$('.spcart-rollsubbar')
		var rollspeed=2
		var timer1
		var timer2
		var timer3
		var timer4
		var timer5
		var timer6
		$('#spcart-headerTitle-first').mouseenter(function  (e) {
			clearInterval(timer4)
			var dis=-rollspeed
			timer1=window.setInterval(function (e) {
				var loc=parseInt($rollbar.css('left'))+dis
				$rollbar.css('left',loc+'px')
				if(parseInt($rollbar.css('left'))<=0){
					clearInterval(timer1)
				}
			}, 1)
		})
		$('#spcart-headerTitle-first').mouseleave(function  (e) {
			clearInterval(timer1)
			timer4=window.setTimeout(rollToSource(), 1000)
			
		})

		$('#spcart-headerTitle-second').mouseenter(function  (e) {
			clearInterval(timer5)
			var $rollbar=$('.spcart-rollsubbar')
			var dis=rollspeed
			if (125-parseInt($rollbar.css('left'))<0) {
				dis=-rollspeed
			}
			timer2=window.setInterval(function (e) {
				var loc=parseInt($rollbar.css('left'))+dis
				$rollbar.css('left',loc+'px')
				// debugger
				if(dis==rollspeed){
					if(parseInt($rollbar.css('left'))>=126){
					clearInterval(timer2)
					}
				}else {
					// console.log('b')
					if(parseInt($rollbar.css('left'))<=126){
					clearInterval(timer2)
					}
				}
			}, 1)
		})
		$('#spcart-headerTitle-second').mouseleave(function  (e) {
			clearInterval(timer2)
			timer5=window.setTimeout(rollToSource(), 1000)
		})

		$('#spcart-headerTitle-thrid').mouseenter(function  (e) {
			clearInterval(timer6)
			var $rollbar=$('.spcart-rollsubbar')
			var dis=rollspeed
			if (parseInt($rollbar.css('left'))<0) {
				dis=-rollspeed
			}
			timer3=window.setInterval(function (e) {
				var loc=parseInt($rollbar.css('left'))+dis
				$rollbar.css('left',loc+'px')
				if (dis==rollspeed) {
					if(parseInt($rollbar.css('left'))>=250){
					clearInterval(timer3)
					}
				}

				
			}, 1)
		})
		$('#spcart-headerTitle-thrid').mouseleave(function  (e) {
			clearInterval(timer3)
			timer6=window.setTimeout(rollToSource(), 2000)
		})

		//roll bar go back to old location
		function rollToSource () {
			var $sourceid=$('.spcart-header-selecTitle').attr('id')
			var sourceLoc=0
			switch ($sourceid) {
				case '#spcart-headerTitle-first':
					sourceLoc=0
					break;
				case '#spcart-headerTitle-second':
					sourceLoc=126
					break;
				case '#spcart-headerTitle-thrid':
					sourceLoc=250
					break;

				default:
					// statements_def
					break;
			}
			var dis=0
			var nowLoc=parseInt($rollbar.css('left'))
			if(sourceLoc-nowLoc>0){
				dis=rollspeed
			}
			else if (sourceLoc-nowLoc==0) {
				return
			}
			else if (sourceLoc-nowLoc<0) {
				dis=-rollspeed
			}
			var timer3=window.setInterval(function (e) {
				var loc=parseInt($rollbar.css('left'))+dis
				$rollbar.css('left',loc+'px')
				if (dis==rollspeed) {
					if(parseInt($rollbar.css('left'))>=sourceLoc){
					clearInterval(timer3)
					}
				}
				else if (dis==-rollspeed) {
					if(parseInt($rollbar.css('left'))<=sourceLoc){
					clearInterval(timer3)
					}
				}	
			}, 1)
		}//end function roll to back


		/*add and reduce btn section*/
		$('.spcart-single-add').click(function  (e) {
			var $input=$(this).parent().find('input').val()
			var addResult=parseInt($input)+1
			$(this).parent().find('input').val(addResult)
			var singlePrice=$($(this).parent().prev().find('span')[1]).text().substring(1)
			singlePrice=Math.round(singlePrice).toFixed(2)
			$(this).parent().next().text('￥'+singlePrice*addResult)
			// $(this).parent().next()
			// console.log(singlePrice)
			cacuAllPrice()
		})
		$('.spcart-single-reduce').click(function  (e) {
			var $input=$(this).parent().find('input').val()
			if ($input==1) {
				return
			}
			var addResult=parseInt($input)-1
			$(this).parent().find('input').val(addResult)
			// console.log($input)
			var singlePrice=$($(this).parent().prev().find('span')[1]).text().substring(1)
			$(this).parent().next().text('￥'+singlePrice*addResult)
			cacuAllPrice()
		})


		/*all select checkbox event*/
		$("input[name='all-select']").change(function  (e) {
			console.log($(this)[0].checked)
			var singleChecks=$('.spcart-single-checkbox')
			var allChecks=$("input[name='all-select']")
			if (!$(this)[0].checked) {
				for (var i = singleChecks.length - 1; i >= 0; i--) {
					singleChecks[i].checked=false
				}
				for (var i = allChecks.length - 1; i >= 0; i--) {
					allChecks[i].checked=false
				}
				cacuAllPrice()
			}
			else {
				for (var i = singleChecks.length - 1; i >= 0; i--) {
					singleChecks[i].checked=true
				}
				for (var i = allChecks.length - 1; i >= 0; i--) {
					allChecks[i].checked=true
				}
				cacuAllPrice()
			}

		})

		// single checkbox event
		$('.spcart-single-checkbox').change(function  (e) {
			cacuAllPrice()
		})

		// function caculate all goods price
		function cacuAllPrice()	{
			var allPrice=0
			var $sinCheck=$('.spcart-single-checkbox')
			var $allPrice=$('.spcar-footerSet-totalPrice')
			var allcount=0
			var payable=false
			for (var i = $sinCheck.length - 1; i >= 0; i--) {
				if($sinCheck[i].checked){
					allPrice+=parseFloat($($sinCheck[i]).parent().find('.spcart-single-totalprice').text().substring(1))
					allcount+=parseFloat($($sinCheck[i]).parent().find('.spcart-single-number').find('input').val())
					payable=true
				}
			}
			if (payable) {
				$('.spcart-header-tool a').css('background','#b10000')
				$('.spcar-footer-settlement a').css('background','#b10000')
			}
			else{
				$('.spcart-header-tool a').css('background','#666')
				$('.spcar-footer-settlement a').css('background','#666')
			}
			$allPrice.text(allPrice)
			$('.spcart-header-tool span:eq(1)').text(allPrice)
			$('.spcar-footerSet-number').text(allcount)
		}


		//add to favorites
		var pageHeight=document.documentElement.scrollHeight
		$('.mask').css('height',pageHeight+'px')
		function popup () {
			
		}

		$('.maskBtn-cancel').click(function  (e) {
			$('.mask').css('display','none')
			$('.mask-popup').css('display','none')
		})

		$('.mask-close').click(function  (e) {
			$('.mask').css('display','none')
			$('.mask-popup').css('display','none')
		})
		var deleteNode=null
		$('.spcart-single-deleteBtn').click(function  (e) {
			$('.mask').css('display','block')
			$('.mask-popup').css('display','block')
			$('.mask-popup').addClass('mask-popup-bigger')
			deleteNode=$(this).parent().parent()
		})
		$('.maskBtn-yes').click(function  (e) {
			// deleteNode.parent().remove(deleteNode)
			console.log(deleteNode.parent())
			deleteNode.remove()
			$('.mask').css('display','none')
			$('.mask-popup').css('display','none')
		})

		$('.spcar-footer-allDelete').click(function  (e) {
			var $sinCheck=$('.spcart-single-checkbox')
			for (var i = $sinCheck.length - 1; i >= 0; i--) {
				if($sinCheck[i].checked){
					// console.log(i+$sinCheck[i].parent())
					$($sinCheck[i]).parent().remove()
				}
			}
		})


		// add to favorites
		$('.spcart-single-addFavorite').click(function  (e) {
			var $temdiv=$('<div></div>')
			$temdiv.addClass('addfavorites-tip').text('移入收藏夹成功')
			$(this).append($temdiv)
			var $this=$(this)
			console.log($temdiv)
			setTimeout(function () {
				$temdiv.remove()
				$this.parent().parent().remove()
			}, 1000)

		})
	})//end ready
})()