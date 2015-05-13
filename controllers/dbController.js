var mongo = require('mongodb').MongoClient;

var dbConfig = {

	connection: function(callback) {
		mongo.connect('mongodb://localhost:27017/resume1', function(err, db) {
			if (err) callback(err);
			else callback(null, db);
		});
	},

	getData: function(params, callback) {
		this.connection(function(err, db) {
			if (err) {
				throw err;
			} else if (params) {
				db.collection('collections').find(params)
				.toArray(function(err, docs) {
					if (err) {
						callback(err);
					} else {
						callback(null, docs);
					};
				});
			} else {
				db.collection('collections').find().toArray(function(err, docs){
					if (err) {
						callback(err);
					} else {
						callback(null, docs);
					};
				});
			};
		});
	},

	insertData: function(data, callback) {
		this.connection(function(err,db) {
			if (err) {
				throw err;
			} else {
				db.collection('collections').insert(data, function(err, result){
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					};
				});
			};
		});	
	},
	
	removeData: function(params, callback) {
		this.connection(function(err,db) {
			if (err) {
				throw err;
			} else {
				db.collection('collections').remove(params, function(err, result) {
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					};
				});
			};
		});
	},
	
	updateData: function(params, data, callback) {
		this.connection(function(err,db) {
			if (err) {
				throw err;
			} else {
				db.collection('collections').update(params, data, function(err, result) {
					if (err) {
						callback(err);
					} else {
						callback(null, err);
					};
				});
			};
		});
	}
};
	
module.exports = dbConfig;
