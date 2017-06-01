!function function_name() {
	window.onload=function () {
		var $sinBtn = $(".single-select")
		var $allBtn = $(".all-select")
		var $addBtn = $(".countReduce")
		var $reduceBtn = $(".countAdd")
		var $sinCon = $(".conSin")

		$sinBtn.click(function () {
			var $this = $(this)
			// alert(0)
			//get this data-select
			var selectBool = parseInt($this.attr("data-select"))
			if (selectBool) {
				$this.removeClass("select-yes")
				$this.attr("data-select" , '0')
			}
			else{
				$this.addClass("select-yes")
				$this.attr("data-select" , "1")
			}

		})//end select click

		$allBtn.click(function () {
			var $this = $(this)
			// alert(0)
			//get this data-select
			var selectBool = parseInt($this.attr("data-select"))
			if (selectBool) {
				$allBtn.removeClass("select-yes")
				$allBtn.attr("data-select" , '0')
				$sinBtn.removeClass("select-yes")
				$sinBtn.attr("data-select" , '0')
			}
			else{
				$allBtn.addClass("select-yes")
				$allBtn.attr("data-select" , '1')
				$sinBtn.addClass("select-yes")
				$sinBtn.attr("data-select" , '1')
			}	
		})


		//add and reduce the count of goods
		$addBtn.bind("click" , function () {
			var $input = $(this).parent().find("input")
			var $myReduceBtn = $(this).parent().find(".countAdd")
			var inputValue = $input.val()
			 inputValue++
			$input.val(inputValue)
			$myReduceBtn.css("color" , "#000")
			// console.log($input)
		})

		$reduceBtn.bind("click" , function () {
			var $input = $(this).parent().find("input")
			var inputValue = $input.val()
			if (inputValue == 1) {
				$(this).css("color" , "#999")
			}else{
			 	inputValue--
			}
			$input.val(inputValue)
			// console.log($input)	
		})

		function changeHandle() {
			// body...

		}
		
	}	//end window onload
}()