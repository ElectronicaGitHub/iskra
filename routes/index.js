var News = require('../models/News'),
    sm = require('sitemap'),
    moment = require('moment'),
	ua = require('mobile-agent');


function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res, next) {
		var agent = ua(req.headers['user-agent']);
		// if (agent.Mobile === true) {
		// 	News.find({}, {
		// 		content: 0,
		// 		content_special: 0
		// 	}, { limit : 20})
		// 		.sort({date : -1})
		// 		.exec(function(err, results) {
		// 			if (err) return next(err);
		// 			res.render('index-mobile', {
		// 				news : results
		// 			})
		// 		})
		// } else {
			res.render('index');
		// }
	});

	router.get('/sitemap.xml', function(req, res) {
		News.find({}, { content : 0, content_special : 0}, function(err, results) {
			if (err) return next(err);
			urls = results.map(function(el) {
				return {
					url : '/post/' + el._id,
					changefreq : 'daily'
				}
			})
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
		var update = { $inc : { views : 1}};
		News.findByIdAndUpdate(req.params.id, update, function(err, result) {
			if (err) return next(err);
			res.render('content', {
				post : result,
				moment : moment
			});
		})
	});

	router.get('/news/:id', function(req, res, next) {
		News.findById(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json(result);
		})
	});

	router.get('/popular/', function(req, res, next) {
		if (req.query.range == 'month') {
			var d = new Date();
			d.setDate(d.getDate() - 7);
		} else {
			var d = new Date();
			d.setMonth(d.getMonth() - 1);
		}
		News.find({ date : { $gte : d }}, {
			content : 0,
			content_special : 0
		},  { limit : req.query.limit} )
			.sort({ views : -1})
			.exec(function(err, results) {
			if (err) return next(err);
			res.json(results);
		})
	})

	router.get('/news/', function(req, res, next) {
		var options = req.query;
		var section = req.query.section;
		var find_query = section ? 
			{
				section : section
			} : {};
		News.find(find_query, { 
			content: 0, 
			content_special : 0 
		}, options)
			.sort({date:-1})
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	});


	return router;
}

module.exports = fn;