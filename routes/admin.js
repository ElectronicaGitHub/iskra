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

	return router;
}

module.exports = admin;