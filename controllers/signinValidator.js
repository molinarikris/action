var db = require('./dbController')('userlist', 'resume');

var validator = function() {

	return {

		checkExist: function(username, callback) {
			db.getData({username: username}, function(err,docs) {
				if (err) {
					callback(err);
				} else if (Object.keys(docs).length) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			});
		},

		checkPasswd: function(username, pass, callback) {
			db.getData({username: username}, function(err,docs) {
				if(err) {
					callback(err);
					return;
				} else if (Object.keys(docs).length) {
					if(docs[0].password == pass) {
						callback(null, docs);
					} else {
						callback(null, false);
					}
				} else {
					callback("noUser");
					return;
				}
			});
		}

	};
};

module.exports = validator();
