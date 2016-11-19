var Data = require('../models/our_data');

exports.addOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var newData = new Data(req.body);

    newData.save(function(err, newData) {
        if (err) throw err;

        res.send('Success');
    })
};