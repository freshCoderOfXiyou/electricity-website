// @search page js
(function () {
	$().ready(function () {
		// alert(1)
		var $oldTargetLi=$('#search-condition-list li:eq(0)')
		$('#search-condition-list').click(function (e) {
			var targetLi=$(e.target)
			var targetText=targetLi.text()
			console.log(targetText)
			var $oldTargetLiText=$oldTargetLi.text()
			if ($oldTargetLiText==targetText) {
				if (targetLi.find('span').hasClass('glyphicon-arrow-down')) {
					targetLi.find('span').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up')
				}
				else if (targetLi.find('span').hasClass('glyphicon-arrow-up')) {
					targetLi.find('span').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down')
					
				}
				// console.log(targetLi.find('span').class)
			}
			else{
				$oldTargetLi.removeClass('search-conditions-selc')
				$oldTargetLi.find('span').removeClass('glyphicon').removeClass('glyphicon-arrow-down')
				switch (targetText) {
					case '人气':
						$('#search-condition-list li:eq(0)').addClass('search-conditions-selc')
						$('#search-condition-list li:eq(0) span').addClass('glyphicon').addClass('glyphicon-arrow-down')
						$oldTargetLi=$('#search-condition-list li:eq(0)')
						break;
					case '销量':
						$('#search-condition-list li:eq(1)').addClass('search-conditions-selc')
						$('#search-condition-list li:eq(1) span').addClass('glyphicon').addClass('glyphicon-arrow-down')
						$oldTargetLi=$('#search-condition-list li:eq(1)')
						break;
					case '新品':
						$('#search-condition-list li:eq(2)').addClass('search-conditions-selc')
						$('#search-condition-list li:eq(2) span').addClass('glyphicon').addClass('glyphicon-arrow-down')
						$oldTargetLi=$('#search-condition-list li:eq(2)')
						break;
					case '价格':
						$('#search-condition-list li:eq(3)').addClass('search-conditions-selc')
						$('#search-condition-list li:eq(3) span').addClass('glyphicon').addClass('glyphicon-arrow-down')
						$oldTargetLi=$('#search-condition-list li:eq(3)')
						break;
					default:
						// statements_def
						break;
				}
			}//end if else
			
		})//end click handle


		//click to see more about brands
		var searchConditionBtn=false
		$('.search-conditon-btn').click(function  (e) {
			if (searchConditionBtn) {
				$('#search-conditions-brand .search-condition-list').css('height','50px').css('border','none')
				$('.search-conditon-btn span').removeClass('search-condiBtn-anima')
				searchConditionBtn=false
			}
			else{
				$('#search-conditions-brand .search-condition-list').css('height','90px').css('border','1px solid #e6e6e6')
				$('.search-conditon-btn span').addClass('search-condiBtn-anima')
				searchConditionBtn=true
			}
			
		})


		$('.search-imgsmall').hover(function  (e) {
			$(this).parent().find('.search-imgbig').attr('src',$(this).attr('src'))
		})
	})//end jquery ready function
})()