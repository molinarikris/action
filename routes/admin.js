var express = require('express');
var router = express.Router();
var resumedb = require('../controllers/dbController')('resume1', 'collections');
var userdb = require('../controllers/dbController')('userlist', 'resume');
var postdb = require('../controllers/dbController')('posts', 'resume');

/* Check for priviliges. */

router.use(function(req, res, next) {
    if (req.session.permissions) {
	if (req.session.permissions.indexOf('admin') == -1) {
		res.render('error', {
			title: 'Nope',
			sessionData: req.session,
			error: {
				status: 403,
				message: "You don't have permission to view the requested page."	
			}
		});
	} else {
		next();
	}
    } else {
	res.redirect('/login');
    }
});

router.get('/', function(req, res) {
	res.render('admin', {
		title: 'Secret Admin Page!',
		sessionData: req.session
	});
});

router.get('/manageResume', function(req, res) {
	resumedb.getData(null, function(err, docs) {
		res.render('insert', {
			title: 'DB Insertion',
			data: docs,
			sessionData: req.session
		});
	});
});

router.get('/manageUsers', function(req, res) {
	if (req.session.permissions.indexOf('god') > -1) {
		userdb.getData(null, function(err, docs) {
			res.render('userpage', {
				title: 'User Page',
				users: docs,
				sessionData: req.session
			})
		});
	}
});

module.exports = router;
