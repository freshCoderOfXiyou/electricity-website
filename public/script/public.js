// param direction:true mean up,false mean down
function publicRoll(node,direction) {
	// debugger
	var selfHeight=parseInt(node.css('height'))
	var selfTop=parseInt(node.css('top'))
	var parentNode=node.parent()
	var parentHeight=parseInt(parentNode.css('height'))

	var scrollTimes=parseInt(selfHeight/parentHeight)
	var singleSrcollHeight=selfHeight/scrollTimes
	// console.log('times',(scrollTimes--))
	if (direction) {
		if (-selfTop/singleSrcollHeight==(scrollTimes-1)){
		var reverseDireTimer=setInterval(function (e) {
			selfTop+=6
			node.css('top',selfTop+'px')
			if (selfTop>=0) {
				clearInterval(reverseDireTimer)
				// console.log(-selfTop/singleSrcollHeight)
			}
		},1)
		}else{
			var timer=setInterval(function  () {
				selfTop-=6
				node.css('top',selfTop+'px')
				if (-selfTop%singleSrcollHeight==0) {
					clearInterval(timer)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},3)
		}
	}//end if
	else {
		if (selfTop>=0){
			var reverseDireTimer2=setInterval(function (e) {
				selfTop-=6
				node.css('top',selfTop+'px')
				if (selfTop<=-singleSrcollHeight*(scrollTimes-1)) {
					clearInterval(reverseDireTimer2)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},1)
		}else{
			var timer2=setInterval(function  () {
			
				selfTop+=6
				node.css('top',selfTop+'px')
				if (-selfTop%singleSrcollHeight==0) {
					clearInterval(timer2)
					// console.log(-selfTop/singleSrcollHeight)
				}
			},3)
		}
		
	}//end else
	
		
}