var express = require('express');
var router = express.Router();
var postdb = require('../controllers/dbController')('posts', 'resume');

router.use(function(req, res, next) {
	if (req.session.permissions) { // Did you log on?
		if (req.session.permissions.indexOf('poster') == -1) { // Do you have permission?
			res.render('error', {
				title: 'Nope',
				sessionData: req.session,
				error: {
					status: 403,
					message: "You don't have permission to view the requested page."
				}
			});
		} else { // Good to go.
			next();
		}
	} else { // I'm sure you just didn't log on.
		res.redirect('/login');
	}
});

/* Now that you're authenticated, check muh routes. */

router.get('/', function(req, res) {
	res.render('curator', {
		title: "Curator Page",
		sessionData: req.session
	});
});

router.get('/newPost', function(req, res) {
	res.render('newPost', {
		title: "Compose a Post",
		sessionData: req.session
	});
});

router.post('/newPost', function(req, res) {
	var post = {
		title: req.body.title,
		date: req.body.dateCreated,
		author: req.session.username,
		body: req.body.body
	};
	postdb.insertData(post, function(err, result) {
		err ? res.send(err) : res.send('');
	});
});

module.exports = router;
