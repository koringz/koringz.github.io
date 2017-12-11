(function  (g) {
	var _plus = 1
	function addBatchTemplate (data, start, stop, everyTimes, fallBack) {
		var str = ''
		if ((stop-everyTimes) <= data.length) {
			for (var i = start; i < stop; i++) {
				if (data[i]){
					var tiny = data[i]
					str += fallBack(tiny)
				}
			}
		}
		return str
	}

	function implementionAddBatchTemplate (option, start, stop, everyTimes, fallBack) {
		$(option.node[0]).append(addBatchTemplate(option.data, start, stop, everyTimes, fallBack))
	}

	function excuteBatchLoadData (option, everyTimes, fallBack) {
		var start = _plus
		implementionAddBatchTemplate(option, start * everyTimes, ++_plus * everyTimes, everyTimes, fallBack)
	}

	function handleEventLoadData (option, everyTimes, fallBack) {
		$(option.node[1]).unbind('click').on('click', function  (e) {
			excuteBatchLoadData(option, everyTimes, fallBack)
		})
	}

	function batchLoading (params) {
		implementionAddBatchTemplate(
			{
				data: params.data,
				node: params.node
			}, 
			params.default, 
			params.everyTime, 
			params.everyTime, 
			params.method
		)
		handleEventLoadData(
			{
				data: params.data,
				node: params.node
			}, 
			params.everyTime, 
			params.method
		)
	}

	g.batchLoading = batchLoading
})(this ? window : global)
