//var random = require('random-js');

var my_data = []

for (var i = 0; i < 20; i++){
	var x = {
		timestamp: Math.floor(Math.random()*10+1),
		spend: Math.random()*10+1
	}
	my_data.push(x);
}
