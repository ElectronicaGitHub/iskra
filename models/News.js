var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var News = new Schema({
	title : {
		type: String
	},
	description : {
		type: String
	},
	content : {
		type: String
	},
	image : {
		type : String
	},
	date : {
		type: Date,
		default : Date.now
	},
	tags : {
		type: [String]
	},
	dish : {
		type : Number
	},
	size :{
		type: Number
	}
})

module.exports = mongoose.model('News', News);
