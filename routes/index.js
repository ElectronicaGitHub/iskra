var News = require('../models/News');

function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	router.get('/all', function(req, res, next) {
		News.find().sort({date:-1}).exec(function(err, results) {
			if (err) return next(err);
			res.json(results);
		})
	})

	return router;
}

module.exports = fn;