var News = require('../models/News'),
    sm = require('sitemap'),
    RSS = require('rss'),
    xml = require('xml'),
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
				    'yandex:full-text' : results[i].content,
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
				// var d = new Date();
				// d.setDate(d.getDate() - 7);
				News.find({}, {
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
		query = search_phrase ? { 
			$text : { $search : search_phrase },
			section : section
		} : {
			section : section
		};
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




	return router;
}

module.exports = fn;