var News = require('../models/News'),
    sm = require('sitemap'),
    moment = require('moment'),
	MobileDetect = require('mobile-detect');

function fn(express) {
	var router = express.Router();

	router.get('/', function(req, res, next) {

		console.log('req.user', req.user)

		function FindNewsAndRespond(limit, render_view) {
			News.find({}, {
				content: 0,
				content_special: 0
			}, { limit : limit})
				.sort({date : -1})
				.exec(function(err, results) {
					if (err) return next(err);
					res.render(render_view, {
						news : results,
						ajax : false
					})
				})
		}
		if (req.query._escaped_fragment_ == '') {
			FindNewsAndRespond(40, 'index-no-ajax');
		} else {
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				FindNewsAndRespond(20, 'index-mobile');
			} else {
				res.render('index', {
					ajax : true
				});
			}
		}
	});

	router.get('/contacts', function(req, res, next) {
		res.render('contacts', {
			light : true
		});
	})

	router.get('/about', function(req, res, next) {
		res.render('about', {
			light : true
		});
	})

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

	router.get('/post/:id', function(req, res, next) {
		var update = { $inc : { views : 1}};
		News.findByIdAndUpdate(req.params.id, update, function(err, result) {
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				var d = new Date();
				d.setDate(d.getDate() - 7);
				News.find({ date : { $gte : d}}, {
					content : 0,
					content_special: 0
				}, { limit : 5})
					.sort({ views : -1})
					.exec(function(err, results) {
						if (err) return next(err);
						res.render('content-mobile', {
							post : result,
							posts : results,
							moment : moment
						});
					})
			} else {
				res.render('content', {
					post : result,
					moment : moment,
					user : req.user
				});
			}
			if (err) return next(err);
			
		})
	});

	router.get('/news/many', function(req, res, err) {
		posts = req.query.posts.split(',');
		console.log('posts', posts);
		News.find({_id : { $in : posts } }, {
			content : 0,
			content_special : 0
		}, function(err, results) {
			res.json(results);
		})		
	})

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

	router.get('/linked_news', function(req, res, next) {
		var query = req.query.search_query;
		var section = req.query.section;
		console.log('s', s);
		News.find({ 
			$text : { $search : query },
			section : section
		}, {
			content : 0,
			content_special : 0
		})
			.sort({ date : -1})
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	})




	return router;
}

module.exports = fn;