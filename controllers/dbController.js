var mongo = require('mongodb').MongoClient;

var dbConfig = function(db, collection) {
    var dbName = db;
    var col = collection;

    return {

	connection: function(callback) {
		mongo.connect('mongodb://localhost:27017/' + dbName, function(err, db) {
			if (err) callback(null, err);
			else callback(null, db);
		});
	},

	getData: function(params, callback) {
		this.connection(function(err, db) {
			if (err) {
				throw err;
			} else if (params) {
				db.collection(col).find(params).toArray(function(err, docs) {
					if (err) {
						callback(err);
					} else {
						callback(null, docs);
					}
				});
			} else {
				db.collection(col).find().toArray(function(err, docs){
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
				db.collection(col).insert(data, function(err, result){
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
				db.collection(col).remove(params, function(err, result) {
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
				db.collection(col).update(params, data, function(err, result) {
					if (err) {
						callback(err);
					} else {
						callback(null, err);
					};
				});
			};
		});
	}
    }
};
	
module.exports = dbConfig;
