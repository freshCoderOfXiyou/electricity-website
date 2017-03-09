function verticalRoll(pnode) {
	function rollUpSin() {
		var timer=window.setInterval(function () {
			var nowTop=parseInt(pnode.css('top'))
			nowTop--
			pnode.css('top',nowTop+'px')
			if (nowTop%$singleHeight==0) {
				clearInterval(timer)
			}
		},10)
	}
	var $mobilebanner=$('#mobilebanner')
	imagesmove($mobilebanner)
	var $singleHeight=parseInt(pnode.parent().height())
	var $childrenCount=pnode.children().length-1
	window.setInterval(function () {
		var nowTop=parseInt(pnode.css('top'))
		nowTop--
		pnode.css('top',nowTop+'px')
		rollUpSin()	
		if (nowTop<=-$singleHeight*$childrenCount) {
			pnode.css('top','0px')
		}
	},2500)
}
