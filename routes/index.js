var News = require('../models/News');

function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	router.get('/post/:id', function(req, res) {
		res.render('content', {
			id : req.params.id
		});
	});

	router.get('/news/:id', function(req, res, next) {
		News.findById(req.params.id).exec(function(err, result) {
			if (err) return next(err);
			res.json(result);
		})
	});

	router.get('/news/', function(req, res, next) {
		var results;
		News.find().sort({date:-1}).exec(function(err, results) {
			if (err) return next(err);
			results.map(function(news) {
				news.normal = {
					title : news.title,
					description : news.description,
					content : news.content,
					image : news.image
				}
				return news
			})
			res.json(results);
		})
	});


	return router;
}

module.exports = fn;