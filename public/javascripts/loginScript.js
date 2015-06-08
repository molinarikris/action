var login = {

	validatePass: function() {
		var pass = $('#pswd').val();
		var passwdRegex = /^(?=.*\d)(?=.*[a-z]).{4,14}$/;
		if (passwdRegex.test(pass)) {
			return true;
		} else {
			return false;
		}
	},

	checkForBlanks: function() {
		if($('#username').val() == '' || $('#pswd').val() == '') {
			return false;
		} else {
			return true;
		}
	},

	init: function() {
		$('#pswd').keyup(function(event){
			if (event.keyCode == 13) {
				if(login.checkForBlanks && login.validatePass) {
					login.sendOff();
				} else {
					$('#username').val('Uh Oh!');
				}
			}
		});
		$('#signIn').click(function(event) {
			event.preventDefault();
			if (login.checkForBlanks && login.validatePass) {
				login.sendOff();
			} else {
				$('#username').val('Uh Oh!');
			}
		});
	},

	sendOff: function() {
			var user = {
				username: $('#username').val(),
				password: $('#pswd').val()
			};
			$('#pswd').val('');
			$.ajax({
				type: 'POST',
				data: user,
				url: '/users/loginuser',
				dataType: 'JSON'
			}).done(function(res) {
				if(!res.msg) {
					window.location = "/";
				} else {
					$('.badmessage').show();
					$('.badmessage:first-child').html(JSON.stringify(res.msg));
				}
			});	
	}




};

$(document).ready(function() {
	login.init();
});
