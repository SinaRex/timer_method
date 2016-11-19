//var random = require('random-js');


var my_data = [];

var max = 10;
var min = 0;
for (var i = 0; i < 40; i++){
	var x = {
		timestamp: Math.floor(Math.random() *(max - min + 1)) + min,
		spend: Math.random() *(max - min + 1) + min
	}
	min = max;
	max += 10;
	my_data.push(x);
	console.log(x);
}
