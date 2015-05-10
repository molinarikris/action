var insertScript = {

	init: function() {
		this.saveLang();
		this.showMore();
	},

	saveLang: function() {
		$('#send').click(function() {
			// Basic Form Validation
			if (
				$('#name').val() === '' || 
				$('#purpose').val() === '' ||
				$('#description').val() === ''
			) {

				$('.message').html("<div class='alert alert-danger'><strong>Error! Fill in the fields!</strong></div>");

			} else if ($('#name').val().indexOf(' ') !== -1) {

				$('.message').html("<div class='alert alert-danger'><strong>Error! Language/Library name can't contain spaces!</strong></div>");
				
			} else {
				$(this).addClass('disabled');
				var data = {
					name: $('#name').val(),
					purpose: $('#purpose').val(),
					description: $('#description').val(),
					experience: $('input[name=expGroup]:checked').val()
				};
				$.ajax({
					type: 'POST',
					data: data,
					url: '/insert',
					dataType: 'JSON'
				}).done(function(res) {
					if(res.msg === '') {
						$('.message').html(
"<div class='alert alert-success' role='alert'><strong>Success!</strong> Inserted Successfully!</div>");
						setTimeout(location.reload(true), 8000);
					} else {
						$('.message').html(
"<div class='alert alert-danger' role='alert'>Something went wrong! "+ res.msg + "</div>");
					}
				});
			}
		});
	},

	showMore: function() {
		$('.more a[id]').click(function(event) {
			event.preventDefault();
			if ($(this).siblings().is(':hidden')) {
				$(this).siblings().fadeIn();
				$(this).hide();
			}
			insertScript.deleteLang();
		});
	},

	deleteLang: function() {
		$('.showLess').click(function() {
			var lang = $(this).attr('id');
			$('.langDesc').hide();
			$('a:hidden').fadeIn();
		});
		$('.deleteLang').click(function(event) {
			event.preventDefault();
			var lang = $(this).attr('id');
			$.ajax({
				type: 'DELETE',
				url: '/deletelang/' + lang
			}).done(function(res) {
				if(res.msg === '') {
					$('.message').html(
"<div class='alert alert-success'><strong>Deleted Successfully.</strong></div>");
					setTimeout(location.reload(true), 8000);
				} else {
					$('.message').html('Something went wrong! ' + res.msg);
				}
			});
		});
	}
};

$(document).ready(function() {
	insertScript.init();
});
