var News = require('../models/News');

function admin(express, config) {
	var router = express.Router();

	router.use(function(req, res, next) {
	    var auth;
	    console.log('middleware just in admin view');
	    if (req.headers.authorization) {
	      auth = new Buffer(req.headers.authorization.substring(6), 'base64')
	        .toString()
	        .split(':');
	    }
	    if (!auth || 
	         auth[0] !== config.get('autentification:username') || 
	         auth[1] !== config.get('autentification:password')
	        ) {
	        res.statusCode = 401;
	        res.setHeader('WWW-Authenticate', 'Basic realm="Server God asks for your password sick hacker!!! Tell him!"');
	        res.render('denied')
	    } else {
	        next();
	    }
	});

	router.get('/', function(req, res) {
		res.render('admin');
	});

	router.post('/', function(req, res, next) {
		news = new News(req.body);
		news.save(function(err) {
			if (err) return next(err);
		})
		res.json({
			result: true
		})
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