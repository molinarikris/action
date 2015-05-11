var resumeScript = {

	init: function() {
		this.navigation();
	},

	navigation: function() {
		$('.list-group a').click(function() {
			$('.list-group a.active').removeClass('active');
			$(this).addClass('active');
			var findMe = $(this).attr('id');
			$.scrollTo($('h2[id*="' + findMe + '"]'), 800, {axis: 'y', offset: {top: -80}} );
		});
	}

};

$(document).ready(function () {
	resumeScript.init();
});
