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
		type : Number
	},
	special : {
		type : String
	},
	// 0 - Космос
	// 1 - Наука
	// 2 - Технологии
	date : {
		type: Date,
		default : Date.now
	}
})

module.exports = mongoose.model('News', News);
