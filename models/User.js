var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;

var User = new Schema({
	nickname : {
		type : String, 
		required : true,
		unique : true
	},
	name: {
		type: String
	},
	surname : {
		type: String
	},
	age : {
		type: String
	},
	reg_date: {
		type: Date,
		default: Date.now
	}
});
exports.User = mongoose.model('User', User);