var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var Event = new Schema({
	title : {
		type: String
	},
	description : {
		type: String
	},
	image_preview : {
		type: String
	},
	image_full : {
		type: String
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

module.exports = mongoose.model('Event', Event);
