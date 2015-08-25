var email = require('emailjs');

var server = email.server.connect({
	host: "localhost",
	port: 25,
});

module.exports = server;
