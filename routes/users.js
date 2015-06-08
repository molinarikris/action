var express = require('express');
var router = express.Router();
var db = require('../controllers/dbController')('userlist', 'resume');
var validate = require('../controllers/signinValidator')

/* GET users listing. */

router.get('/users', function(req, res) {
	if(req.protocol == "http") {
		res.redirect("https://" +req.headers["host"]+req.url);
	}
	db.getData(null, function(err, docs) {
		if (err) {
			res.send({msg: err});
		} else {
			res.json(docs)
		}
	});
});

router.post('/newuser', function(req, res) {
	if(req.protocol == "http") {
		res.redirect("https://"+req.headers["host"]+req.url);
	}
	validate.checkExist(req.body.username, function(err, result) {
		if (err) {
			res.send({msg: JSON.stringify(err)});
		} else if (result) {
			res.send({msg: "That username is taken."});
		} else {
			var data = {
				username: req.body.username,
				password: req.body.password,
				email: req.body.email,
				priviliges: ['commenter']
			};	
			db.insertData(data, function(err, result) {
				if (err) {
					res.send({msg: err, result: result});
				} else {
					res.send({msg: '', result: result});
				}
			});
		}
	});
});

router.post('/loginuser', function(req, res) {
	validate.checkExist(req.body.username, function(err, result) {
		if(err) {
			res.send({msg: err});
			return;
		} else if (!result) {
			res.send({msg: "Username does not exist."});
			return;
		} else {
			validate.checkPasswd(req.body.username, req.body.password, function(err, user) {
				if(err) {
					res.send({msg: err});
				} else if (!user) {
					res.send({msg: "Password does not match"});
				} else {
					req.session.username = user[0].username;
					req.session.permissions = user[0].priviliges;
					res.send({msg: ''});
				}
			});
		}
	});
});

router.get('/logout/:user', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});

router.get('/:user', function(req, res) {
		res.render('user', {
			title: req.session.username,
			sessionData: req.session
		});
});

module.exports = router;
