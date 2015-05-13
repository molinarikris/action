var express = require('express');
var db = require('../controllers/dbController');
var email = require('../controllers/emailController');
var router = express.Router();

// ---------------->> Intersite Routing <<----------------

router.get('/', function(req, res) {
	res.render('index', {
		title: 'Home'
	});
});


router.get('/resume', function(req, res) {
	db.getData(null, function(err, docs) {
		if (err) {
			res.render('error', {error: err});
		} else {
			res.render('resume', {
				title: 'My Resume',
				data: docs
			});
		};
	});
});

router.get('/insert', function(req, res) {
	db.getData(null, function(err, docs) {
		res.render('insert', {
				title: 'DB Insertion',
				data: docs
		});
	});
});

router.get('/about', function(req, res) {
	res.render('about', {
			title: 'About me'
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {
			title: 'Contact me'
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
		};
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
