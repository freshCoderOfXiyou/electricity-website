(function () {
	$().ready(function  () {
		var choose=false
		var xhr = null
		var $idtext = $("#idinput")
		var $pswtext = $("#pswinput")
		var $btn = $(".load-formCon-submit")
		var $alert = $(".load-form-alert")

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

		

		$btn.bind("click" ,function sendAjax() {
			var idinput = $idtext.val()
			var pswinput = $pswtext.val()
			if ( typeof(idinput) == "undefined" || idinput == "") {
				$alert.text("您还没有输入账号!")
				$alert.css("border-color" , "red")
			}
			else if (typeof(pswinput) == "undefined" || pswinput == "") {
				$alert.text("您还没有输入密码!")
				$alert.css("border-color" , "red")
			}
			else{
				$.post("/ajaxpost",{
					    id : idinput,
					    psw : pswinput,
					},function(response){
					    if (response.back) {
					    	window.location.href="/pc"
					    }
					    else{
					    	$alert.text("账号密码有误!")
							$alert.css("border-color" , "red")
							$alert.css("color" , "red")
					    }
					});
				}
			// console.log(idinput , pswinput)

			}//end callback function
		)

		// $.post("/ajaxpost",{
		//     aaaa : 1,
		//     bbbb : "tom",
		// },function(response){
		//     console.log(response)
		// });








	})//end ready
})()