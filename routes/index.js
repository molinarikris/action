var express = require('express');
var email = require('../controllers/emailController');
var router = express.Router();
var db = require('../controllers/dbController')('resume1', 'collections');

// ---------------->> Intersite Routing <<----------------

router.get('/', function(req, res) {
	var sess = req.session;
	if (sess.cookie) {
		if (sess.username) {
			sess.save(function(err) {
				res.render('index', {
					title: 'Home',
					cookies: sess.id
				});
			});
		} else {
			res.render('index', {
				title: 'Home',
				username: "anon",
				perms: ["none"],
				cookies: req.cookies
			});
		}
	} else {
		res.redirect('/login');
	}
});

router.get('/resume', function(req, res) {
	db.getData(null, function(err, docs) {
		if (err) {
			res.render('error', {error: err});
		} else {
			res.render('resume', {
				title: 'My Resume',
				data: docs,
				sessionData: req.session
			});
		};
	});
});

router.get('/insert', function(req, res) {
	db.getData(null, function(err, docs) {
		res.render('insert', {
				title: 'DB Insertion',
				data: docs,
				sessionData: req.session
		});
	});
});

router.get('/about', function(req, res) {
	res.render('about', {
			title: 'About me',
			sessionData: req.session
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {
			title: 'Contact me',
			sessionData: req.session
	});
});

router.post('/contact', function(req, res) {
	var emailBody = {
		text: req.body.body,
		from: req.body.name + "<" + req.body.email + ">",
		to: "TheFullStackGuy@gmail.com",
		subject: req.body.subject + " | molinarikris.com"
	};
	email.send(emailBody, function(err, message) {
		res.send({msg: err});
	});
});

router.get('/login', function(req, res) {
	if(req.protocol == "http") {
		res.redirect("https://" + req.headers["host"] + req.url);
	} else {
		res.render('login', {title: "Log In"});
	}
});

router.get('/signup', function(req, res) {
	if(req.protocol == "http") {
		res.redirect("https://" + req.headers["host"] + req.url);
	} else {
		res.render('signup', {title: "Sign Up"});
	}
});

// ---------------->> Database CRUD Routes <<----------------

router.get('/getlangs', function(req, res) {
	db.getData(null, function(err, docs) {
		if (err) {
			res.send({msg: err});
		} else {
			res.json(docs)
		};
	});
});

router.post('/insert/:id', function(req, res) {
	var data = {
		name: req.body.name,
		purpose: req.body.purpose,
		description: req.body.description,
		experience: req.body.experience
	};
	db.updateData({name: req.params.id}, data, function(err, result) {
		if (err) {
			res.send({msg: err, result: result});
		} else {
			res.send({msg: '', result: result});
		};
	});		
});

router.post('/insert', function(req, res) {
	var data = {
		name: req.body.name,
		purpose: req.body.purpose,
		description: req.body.description,
		experience: req.body.experience
	};
	db.insertData(data, function(err, result) {
		if (err) {
			res.send({msg: err, result: result});
		} else {
			res.send({msg: '', result: result});
		}
	});	
});

router.delete('/deletelang/:id', function(req, res) {
	db.removeData({name: req.params.id}, function(err, result) {
		if (err) {
			res.send({msg: err, result: result});
		} else {
			res.send({msg: '', result: result});
		};
	});
});

module.exports = router;
