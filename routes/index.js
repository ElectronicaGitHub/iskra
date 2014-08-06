var News = require('../models/News');

function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	router.get('/all', function(req, res, next) {
		News.find(function(err, result) {
			if (err) return next(err);
			res.json(result)
		})
	})

	return router;
}

module.exports = fn;