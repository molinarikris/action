var contactScript = {

	init: function() {
		this.submit();
	},

	submit: function() {
		$('.btn').click(function(event) {
			event.preventDefault();
			$(this).addClass('disabled');
			// Validate stuff
			var totallyValidated = function() {
				var quit = function(msg) {
					$('.btn').removeClass('disabled');
					$('.message').html("<div class='alert alert-danger'>Uh oh! " + msg + "!</div>");
				};
				// Zero-Entry Test
				if ($('#name').val() == '' ||
				$('#email').val() == '' ||
				$('#body').val() == '') {
					quit("Fill in the required fields");
					return false;
				}
				// Email
				var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				if (!(emailRegex.test($('#email').val()))) {
					quit("Your email is not valid");
					return false;
				}
				// Check for optional subject, else send without
				if ($('#subject').val() == '') {
					return "No Subject";
				} else {
					return $('#subject').val();
				}
			}
			if (totallyValidated()) {
				$.post('/contact', {
				  body: $('#body').val(),
				  name: $('#name').val(),
				  email: $('#email').val(),
				  subject: totallyValidated()
				}).done(function(res) {
					if (!(res.msg)) {
						$('.message').html("<div class='alert alert-success'><strong>Success!</strong></div>");
						setTimeout(window.location.reload(true), 3000);
					} else {
						$('.message').html("<div class='alert alert-danger'>Uh oh! " + JSON.stringify(res.msg)+ "!</div>");
						$('.btn').removeClass('disabled');
					}
				});
			}
		});
	}
};

$(document).ready(function() {
	contactScript.init();
});
