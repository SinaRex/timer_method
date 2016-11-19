//var random = require('random-js');

var my_data = []

for (let i = 0; i < 20; i++){
	let x = {
		timestamp: Math.floor(Math.random()*10+1),
		spend: Math.random()*10+1
	}
	my_data.push(x);
	console.log(x);
}