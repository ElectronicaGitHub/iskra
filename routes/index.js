var News = require('../models/News');

function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	router.get('/post/:id', function(req, res) {
		News.findById(req.params.id, function(err, result) {
			if (err) return next(err);
			res.render('content', {
				post : result
			});
		})
	});

	router.get('/news/:id', function(req, res, next) {
		News.findById(req.params.id).exec(function(err, result) {
			if (err) return next(err);
			res.json(result);
		})
	});

	router.get('/news/', function(req, res, next) {
		var search = req.query;
		News.find({},{ 
			content: 0, 
			content_special : 0 
		}, search)
			.sort({date:-1})
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	});


	return router;
}

module.exports = fn;