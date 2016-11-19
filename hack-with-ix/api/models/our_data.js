var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

var dataSchema = new Schema(
	{
		timestamp: {
			type: Timestamp, required: true 
		},
		spend: {
			type: Double, required: true
		}
	},

	{
		collections : 'dataCollection'
	}

)

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/datadb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('Data', dataSchema);
