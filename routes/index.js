function fn(express) {
	var User = require('../models/User').User;
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	return router;
}

module.exports = fn;