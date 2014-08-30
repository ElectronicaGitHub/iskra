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
	title_special : {
		type: String
	},
	description_special : {
		type: String
	},
	content_special : {
		type: String
	},
	image_special : {
		type : String
	},
	section : {
		type : String
	},
	special : {
		type : String
	},
	views : {
		type : Number,
		default : 0
	},
	date : {
		type: Date,
		default : Date.now
	}
})

module.exports = mongoose.model('News', News);
