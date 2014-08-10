var News = require('../models/News');

function admin(express) {
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('admin');
	});

	router.post('/', function(req, res, next) {
		news = new News(req.body);
		news.save(function(err) {
			if (err) return next(err);
		})
		res.json('News successfully created')
	})


	router.post('/:id', function(req, res, next) {
		News.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
			if (err) return next(err);
			res.json({
				action : 'updated', 
				id : result._id, 
				title : result.title
			});
		})
	});

	router.delete('/:id', function(req, res, next) {
		News.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('deleted');
		})
	});

	return router;
}

module.exports = admin;