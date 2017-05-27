!function () {
	window.onload=function () {
		var $idEle = $("#idinput")
		var $pswEle = $("#pswinput")
		var $submitEle = $(".load-form-submit")
		var $maskbtn = $(".contentBtn")
		var $mask = $(".mask")
		$submitEle.bind("click" , function () {
			var id = $idEle.val()
			var psw = $pswEle.val()
			if (id !="" && psw !="") {

				$.post("/ajaxpost",{
					    id : id,
					    psw : psw,
					},function(response){
					    if (response.back) {
					    	window.location.href="/mindex"
					    }
					    else{
					    	$mask.css("display" , "block")
					    }
					})//end post
			}//end if
		})//end event

		$maskbtn.bind("click" , function () {
			console.log(1)
			$mask.css("display" , "none")
		})

	}
}()