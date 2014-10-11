var News = require('../models/News'),
	Events = require('../models/Event'),
	Articles = require('../models/Article'),
    sm = require('sitemap'),
    RSS = require('rss'),
    xml = require('xml'),
    moment = require('moment'),
	MobileDetect = require('mobile-detect'),
	sanitizeHtml = require('sanitize-html');

function fn(express) {
	var router = express.Router();

	router.get('/', function(req, res, next) {

		console.log('req.user', req.user)
		if (req.query.section) {
			q = { 
				section : req.query.section 
			}
		} else q = {};

		function FindNewsAndRespond(limit, render_view, include_article) {
			article = {};
			if (include_article) {
				Articles.find({})
					.sort({ date : -1})
					.exec(function(err, results) {
						if (err) return next(err);
						article = results[0];
					})
			}
			News.find(q, {
				content: 0,
				content_special: 0
			}, { limit : limit})
				.sort({date : -1})
				.exec(function(err, results) {
					if (err) return next(err);
					res.render(render_view, {
						news : results,
						ajax : false,
						article : article,
						query : q
					})
				})
		}
		if (req.query._escaped_fragment_ == '') {
			FindNewsAndRespond(40, 'index-no-ajax');
		} else {
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				FindNewsAndRespond(20, 'index-mobile', true);
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

	router.get('/archive', function(req, res, next) {
		res.render('archive');
	})

	router.get('/rss', function(req, res, next) {
		var cat_map = {
			'physics': 'Физика',
			'space': 'Космос',
			'tech': 'Технологии'
		}

		var feed = new RSS({
		    title: 'Твой Космос | Новостное научно-популярное издание о науке и космосе',
		    description: 'Современное интернет издание, ежедневно выпускающее эксклюзивные научно-популярные новости',
		    feed_url: 'http://tvoykosmos.ru/rss',
		    site_url: 'http://tvoykosmos.ru',
		    image_url: 'http://tvoykosmos.ru/images/tk.png',
		    // docs: 'http://example.com/rss/docs.html',
		    // author: 'Dylan Greene',
		    managingEditor: 'dimaastronom@gmail.com',	
		    webMaster: 'molo4nik11@gmail.com',
		    copyright: '2014 Твой Космос',
		    language: 'ru',
		    // categories: ['Category 1','Category 2','Category 3'],
		    // pubDate: 'May 20, 2012 04:00:00 GMT',
		    ttl: '120'
		});

		News.find({}, {
			content_special : 0 
		}, { limit : 15 }).sort({ date : -1 }).exec(function(err, results) {
			for (i in results) {
				feed.item({
				    title:  results[i].title,
				    description: results[i].description,
				    url: 'http://tvoykosmos.ru/post/' + results[i]._id,
				    // guid: '1123', // optional - defaults to url
				    // categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
				    // author: 'Guest Author', // optional - defaults to feed author property
				    date: results[i].date,
				    enclosure: {url: results[i].image},
				    categories : [cat_map[results[i].section]], // optional enclosure
				    'yandex:full-text' : sanitizeHtml(results[i].content, {
				    	allowedTags : []
				    }),
				    'yandex:genre' : 'acticle'
				});
			}
			var xmlString = feed.xml();
			res.header('Content-Type', 'application/xml');
			res.send(xmlString);
		})
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
			if (err) return next(err);
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				News.find({ _id : { $ne : req.params.id }}, {
					content : 0,
					content_special: 0
				}, { limit : 7})
					.sort({ date : -1})
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
			
		})
	});

	router.get('/event/:id', function(req, res, next) {
		var update = { $inc : { views : 1}};
		Events.findByIdAndUpdate(req.params.id, update, function(err, result) {
			if (err) return next(err);
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				News.find({}, {
					content : 0,
					content_special: 0
				}, { limit : 7})
					.sort({ date : -1})
					.exec(function(err, results) {
						if (err) return next(err);
						res.render('event-mobile', {
							event_ : result,
							posts : results,
							moment : moment
						});
					})
			} else {
				res.render('event', {
					event_ : result,
					moment : moment,
					user : req.user,
					light : true
				});
			}	
		})
	})

	router.get('/article/:id', function(req, res, next) {
		var update = { $inc : { views : 1}};
		Articles.findByIdAndUpdate(req.params.id, update, function(err, result) {
			if (err) return next(err);
			md = new MobileDetect(req.headers['user-agent']);
			if (md.phone()) {
				News.find({}, {
					content : 0,
					content_special: 0
				}, { limit : 7})
					.sort({ date : -1})
					.exec(function(err, results) {
						if (err) return next(err);
						res.render('article-mobile', {
							article : result,
							posts : results,
							moment : moment
						});
					})
			} else {
				res.render('article', {
					article : result,
					moment : moment,
					user : req.user,
					light : true
				});
			}	
		})
	})

	router.get('/news/many', function(req, res, err) {
		posts = req.query.posts.split(',');
		console.log('posts', posts);
		News.find({_id : { $in : posts } }, {
			content : 0,
			content_special : 0
		})
		.sort({date: -1})
		.exec(function(err, results) {
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
			d.setMonth(d.getMonth() - 1);
		} else {
			var d = new Date();
			d.setDate(d.getDate() - 7);
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
		var limit = req.query.limit || 12;
		var page = req.query.page - 1 || 0;
		console.log(req.query)
		var options = {
			limit : limit,
			skip : page * limit
		}
		console.log(options)
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
		var search_phrase = req.query.search_query;
		var section = req.query.section;
		console.log('query', search_phrase);
		query = search_phrase && section ? { 
			$text : { $search : search_phrase },
			section : section
		} : section ? {
			section : section
		} : search_phrase ? {
			$text : { $search : search_phrase }
		} : {};
		console.log(query)

		News.find(query, {
			content : 0,
			content_special : 0
		})
			.sort({ date : -1})
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	})

	router.get('/articles', function(req, res, next) {
		md = new MobileDetect(req.headers['user-agent']);
		if (md.phone()) {
			Articles.find().sort({date : -1}).exec(function(err, results) {
				if (err) return next(err);
				res.render('articles-list-mobile', {
					articles : results,
					ajax : false
				})
			})
		} else {
			res.render('articles-list', {
				ajax : true
			});
		}
	});

	router.get('/articles_list', function(req, res, next) {
		params = req.query;
		Articles.find({}, {
			content : 0
		}, params).sort({ date : -1 })
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	});

	router.get('/articles/:id', function(req, res, next) {
		Articles.findById(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json(result);
		})
	});

	router.get('/events', function(req, res, next) {
		md = new MobileDetect(req.headers['user-agent']);
		if (md.phone()) {
			Events.find().sort({date : -1}).exec(function(err, results) {
				if (err) return next(err);
				res.render('events-list-mobile', {
					events : results,
					ajax : false
				})
			})
		} else {
			res.render('events-list', {
				ajax : true
			});
		}
	});

	router.get('/events_list', function(req, res, next) {
		if (req.query.excl_event) {
			var find_query = { _id : { $ne : req.query.excl_event } }
		} else {
			var find_query = {};
		}
		if (req.query.limit) {
			var limit = req.query.limit;
		} else {
			var limit = 6;
		}
		var show_description = parseInt(req.query.show_description);
		if (show_description) {
			excluding = {
				// image_full : 0
			}
		} else excluding = {
			description : 0
			// image_full : 0
		}
		Events.find(find_query, excluding, {
			limit : limit
		})
			.sort({ date: -1 })
			.exec(function(err, results) {
				if (err) return next(err);
				res.json(results);
			})
	});

	router.get('/events/:id', function(req, res, next) {
		Events.findById(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json(result);
		})
	});

	return router;
}

module.exports = fn;