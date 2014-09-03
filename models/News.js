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
		type: String
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
	linked_news : {
		type : [String]
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

// # или создать в базе индекс сразу
// # через ensureIndex
News.index({
	title : 'text',
	description : 'text',
	content : 'text'
}, {default_language : 'russian'});


module.exports = mongoose.model('News', News);
