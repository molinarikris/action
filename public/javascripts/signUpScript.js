var signUp = {

	init: function() {
		$('#go').click(function(event) {
			event.preventDefault();
			if (!this.totallyValidated) {
				$('#confPswd').val('');
				var data = {
					username: $('#username').val(),
					password: $('#pswd').val(),
					email: $('#email').val()
				};
				$.ajax({
					type: "POST",
					data: data,
					dataType: "JSON",
					url: "/users/newuser"
				}).done(function(res) {
					if (res.msg === '') {
						window.location = '/login';
					} else {
						$('.badmessage').show();
						$('.badmessage:first-child').html(JSON.stringify(res.msg));
					}
				});
			} else {
				$('.badmessage').show();
				$('.badmessage:first-child').html(this.totallyValidated);
			}
		});
	},

	totallyValidated: function() {
		!this.equalCheck ? {return: "Passwords aren't the same"} : !this.minRequirementCheck ? {return: "Password not strong enough"} : !this.emailCheck ? {return: "Enter a valid email."} : {return: false};
	},

	equalCheck: function() {
		if ($('#pswd').val() == $('#confPswd').val()){
			return true;
		} else {
			return false;
		}
	},

	minRequirementCheck: function() {
		var pass = $('#pswd').val();
		var passwdRegex = /^(?=.*\d)(?=.*[a-z]).{4, 14}$/;
		if (passwdRegex.test(pass)) {
			return true;
		} else {
			return false;
		}
	},

	emailCheck: function() {
		var email = $('#email').val();
		var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		if (emailRegex.test(email)) {
			return true;
		} else {
			return false;
		}
	}

}

$(document).ready(function() {
	signUp.init();
});
