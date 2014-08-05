function admin(express) {
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('admin');
	});

	return router;
}

module.exports = admin;