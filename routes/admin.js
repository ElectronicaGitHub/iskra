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
		console.log('req.user:', req.user)
		res.render('admin');
	});

	router.post('/', function(req, res, next) {
		news = new News(req.body);
		// ищем уже имеющиеся новости, чтобы вынуть связанные
		News.findById(news.linked_news[0], function(err, result) {
			// обьединяем уже имеющиеся связанные новости с добавленными
			news.linked_news = concatAndFilter(news.linked_news, result);
			// сохраняем сущность
			news.save(function(err) {
				if (err) return next(err);
				save = true;
				if (news.linked_news.length > 0) {
					if (saveMultilink(news.linked_news, news._id)) {
						multisave = true;
					} else {
						multisave = false;
					}
				} else {
					multisave = 'no links for other posts for multisave';	
				}
				res.json({
					save: save, 
					multisave : multisave
				})
			})
		})
	})


	router.post('/:id', function(req, res, next) {
		var post = req.body;
		delete post._id;
		// ищем уже имеющиеся новости, чтобы вынуть связанные
		News.findById(post.linked_news[0], function(err, result) {
			// обьединяем уже имеющиеся связанные новости с добавленными
			post.linked_news = concatAndFilter(post.linked_news, result);
			// апдейтим сущность
			News.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
				if (err) return next(err);
				save = true;
				if (post.linked_news.length > 0) {
					if (saveMultilink(post.linked_news, req.params.id)) {
						multisave = true;
					} else {
						multisave = false;
					}
				} else {
					multisave = 'no links for other posts for multisave';
				}
				res.json({
					save: save, 
					multisave : multisave
				})
			})
		})
	});

	router.delete('/:id', function(req, res, next) {
		News.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('deleted');
		})
	});

	function concatAndFilter(arr ,result) {
		if (result) {
			if (result.linked_news) {
				arr = arr.concat(result.linked_news);
			}
			arr = arr.filter(function(item, pos) {
		    	return arr.indexOf(item) == pos;
			})
		}
		return arr;
	}

	function saveMultilink(linked_posts, post) {
		ll = linked_posts.length;
		for (i=0; i<ll; i++) {
			c = linked_posts.slice(0);
			upd_elem = c.splice(i,1,post)[0];
			News.findByIdAndUpdate(upd_elem, { linked_news : c }, function(err, res) {
				if (err) return false;
			})
		}
		return true;
	}
	return router;
}

module.exports = admin;