/*

    FILE: app.filter.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.filter = {
    init: function() {
		if ($('#filter-trigger').length) {
			var self = this,
			selectedCategory;

			$(document).on('click', '#filter-trigger', function(e) {
				e.preventDefault();
				$('.filter-overlay').css('z-index', '102');
				$('.filter-overlay').addClass('active');

				setTimeout(function(){
					$('.filter-list').addClass('active');
					$('body').css('overflow', 'hidden');
				}, 250);
			});

			$(document).on('click', '.filter-overlay', function() {
				if (event.target.tagName.toLowerCase() != 'a') {
					$('.filter-list').removeClass('active');
					setTimeout(function(){
						$('.filter-overlay').removeClass('active');
						$('body').css('overflow', 'auto');
					}, 250)
					setTimeout(function(){
						$('.filter-overlay').css('z-index', '-1');
					}, 500)
				}
			});
		}
	}
};
