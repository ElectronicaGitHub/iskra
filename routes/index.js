var express = require('express');
var router = express.Router();
var User = require('../models/User').User;

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Science is cool' });
});
router.post('/', function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) return next(err)
	})
	res.send('ok');
})

module.exports = router;
