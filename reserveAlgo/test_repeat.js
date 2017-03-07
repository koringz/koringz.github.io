
function  dom(options) {

	return document.querySelector(options);

}

function  reg () {

	function  defaultLister (options) {

	 	this.options = options;

	};

	function  getContents() {

		var words =  this.options ? this.options  : "give you a line of words";
		
		// If it is't space and ' '. you need to replace the Boolean -1 .
		if ( words.search(/' '/) ) {

			var a = [],
				str = '',
				restr='';

			// foreach the words content.
			for (var i = 0, len = words.length; i < len; i++) {

				var k=[],
					s = [],
					p = null;

				s.push(words[i]);

				p = s[0];

				if (p !== ' ') {

					str += ''+ words[i];
					continue;

				}
				else if(p === ' '){

					if(str !== ''){

						a.push(str);

					}

					str = '';
					continue;

				}
				else { break; }

			}

			a.push(str);

			var j = [],i=0;

			for(var g = a.length-1; g < a.length; g--){

				if(g >= 0){

					j.push(a[g]);

					restr += j[i++] + ' ';

				}
				else{ break; }

			}


		}
		else{ return; }

		return restr;

	};

	return {
		getContents : getContents, // get content.
		defaultLister : defaultLister // output user owns content or value.
	};

};


// Add a value in the method. it is Okay.
function  outputVlue(userContent) {

	var REG = new reg();

		REG.defaultLister(userContent);

	return REG.getContents();

};

