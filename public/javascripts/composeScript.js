var compose = {

	checkForBlanks: function() {
		if ($('#title').val() === '' ||
		    $('#body').val() === '') {
			return false;
		} else {
			return true
		}
	},

	ifItsGood: function() {
		if (this.checkForBlanks()) {
			var post = {
				title: $('#title').val(),
				dateCreated: new Date(),
				body: $('#body').val()
			};
			return post;
		} else {
			return false;
		}
	},

	sendOff: function() {
		$('.message:visible').hide();
		var goodness = this.ifItsGood();
		if (goodness) {
			$('button').toggleClass('disabled');
			$.ajax({
			  type: "POST",
			  data: goodness,
			  dataType: "JSON",
			  url: '/curator/newPost'
			}).done(function(res) {
				if(err) {
					$('.message').show().toggleClass('alert-danger');
					$('.message:first-child').html('<strong>Uh oh!</strong> There was an error! ' + JSON.stringify(err));
				}else{
					window.location = '/curator';
				}
			});
		} else {
			$('.message').show().toggleClass('alert-warning');
			$('.message:first-child').html('<strong>Hey!</strong> Fill in those fields!');
		}
	},

	init: function() {
		$('button').click(function(event) {
			event.preventDefault();
			compose.sendOff();
		});
	}

};

$(document).ready(function() {
	compose.init();
});
