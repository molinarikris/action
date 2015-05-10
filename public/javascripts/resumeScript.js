var resumeScript = {

	init: function() {
		this.navigation();
	},

	navigation: function() {
		$('.list-group a').click(function() {
			var findMe = $(this).attr('id');
			$.scrollTo($('h2#' + findMe), 800, {axis: 'y', offset: {top: -80}} );
		});
	}

};

$(document).ready(function () {
	resumeScript.init();
});
