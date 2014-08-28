var News = require('../models/News'),
    sm = require('sitemap');


function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	

	router.get('/sitemap.xml', function(req, res) {
		News.find({}, { content : 0, content_special : 0}, function(err, results) {
			if (err) return next(err);
			urls = results.map(function(el) {
				return {
					url : '/post/' + el._id,
					changefreq : 'daily'
					// priority : 0.3
				}
			})
			console.log('inside', urls);
			sitemap = sm.createSitemap ({
		      hostname: 'http://tvoykosmos.ru',
		      cacheTime: 600000,        // 600 sec - cache purge period
		      urls: urls
		    });
		    sitemap.toXML( function (xml) {
		        res.header('Content-Type', 'application/xml');
		        res.send( xml );
		    });
		})
	});

	router.get('/robots.txt', function(req, res) {
		res.set('Content-Type', 'text/plain');
		res.sendfile('robots.txt');
	})

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