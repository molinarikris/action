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
		$('#signIn').click(function(event) {
			event.preventDefault();
			$(this).toggleClass('disabled');
			if(login.checkForBlanks && login.validatePass) {
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
			} else {
				$('#username').val('Uh Oh!');
			}
		});
	}



};

$(document).ready(function() {
	login.init();
});
