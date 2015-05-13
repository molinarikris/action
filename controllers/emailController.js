var email = require('emailjs');

var server = email.server.connect({
	user: "kamolinari",
	password: "krice21",
	host: "localhost",
	port: 25,
});

module.exports = server;
