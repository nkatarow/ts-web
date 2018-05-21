/*

    FILE: app.heroFunctions.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.heroFunctions = {
    init: function() {
		if ($('.hero').length || $('.offering-hero').length) {
			$('#header').addClass('transparent');

			if ($('.hero').length) {
				var color = $('.hero').data('font-color'),
					hero = new Waypoint.Inview({
					element: $('.hero-copy'),
					enter: function(direction) {
						$('.logo .text').css('fill', color);
						$('a.back').css('color', color);
					},
					exited: function(direction) {
						$('.logo .text').removeAttr('style');
						$('a.back').removeAttr('style');
					}
				})
			} else if ($('.offering-hero').length) {
				var color = $('.offering-hero').data('font-color');
					hero = new Waypoint.Inview({
					element: $('.offering-hero'),
					enter: function(direction) {
						$('.logo .text').css('fill', color);
						$('a.back').css('color', color);
					},
					exited: function(direction) {
						$('.logo .text').removeAttr('style');
						$('a.back').removeAttr('style');
					}
				})
			}

			$(window).scroll(function(e){ parallax(); });

			function parallax(){
			    var scrolled = $(window).scrollTop();
			    $('.hero').css('top', -(scrolled * 0.2) + 'px');
			}
		} else {
			$('.logo .text').removeAttr('style');
			$('a.back').removeAttr('style');
		}
	}
}
