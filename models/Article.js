var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var Article = new Schema({
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
	type_label : {
		type : String
	},
	author : {
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

// # или создать в базе индекс сразу
// # через ensureIndex
// News.index({
// 	title : 'text',
// 	description : 'text',
// 	content : 'text'
// }, {default_language : 'russian'});


module.exports = mongoose.model('Article', Article);
