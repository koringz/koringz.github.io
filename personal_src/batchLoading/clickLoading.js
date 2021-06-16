(function  (g) {
	var _plus = 1
	function addBatchTemplate (data, start, stop, everyTimes, fallBack, complate) {
		var str = ''
		if ((stop-everyTimes) <= data.length) {
			for (var i = start; i < stop; i++) {
				if (data[i]){
					var tiny = data[i]
					str += fallBack(tiny)
				}
			}
		}
		else {
			complate()
		}
		return str
	}

	function implementionAddBatchTemplate (option, start, stop, everyTimes, fallBack, complate) {
		$(option.node[0]).append(addBatchTemplate(option.data, start, stop, everyTimes, fallBack, complate))
	}

	function excuteBatchLoadData (option, everyTimes, fallBack, complate) {
		var start = _plus
		implementionAddBatchTemplate(option, start * everyTimes, ++_plus * everyTimes, everyTimes, fallBack, complate)
	}

	function handleEventLoadData (option, everyTimes, fallBack, complate) {
		$(option.node[1]).unbind('click').on('click', function  (e) {
			excuteBatchLoadData(option, everyTimes, fallBack, complate)
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
			params.method,
			params.complate
		)
		handleEventLoadData(
			{
				data: params.data,
				node: params.node
			}, 
			params.everyTime, 
			params.method,
			params.complate
		)
	}

	g.batchLoading = batchLoading
})(this ? window : global)
