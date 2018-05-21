/*

    FILE: app.nav.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.nav = {
    init: function() {
		var self = this;

		// Open/close nav
		$(document).on('click', '.logo', function(event) {
			event.preventDefault();

			if (window.location.pathname != "/") {
				if ($('header').hasClass('active')) {
					self.closeNav();
				} else {
					self.openNav();
				}
			}
		});

		// Nav links to 2nd level pages
		$('nav .nav').hover(function(){
			var target = this.text,
				target = target.toLowerCase();

			$('.nav-hover img.' + target).toggleClass('active');
		});

		var overlay = document.getElementById('nav-overlay');

		overlay.addEventListener('touchmove', function(e) {
        	e.preventDefault();
		}, false);
	},
	openNav: function(){
		var self = this;

		self.showOverlay();

		setTimeout(function(){
			self.showNavItems();
		}, 250)

	},
	closeNav: function(){
		var self = this;

		self.hideNavItems();

		setTimeout(function(){
			self.hideOverlay();
		}, 250);
	},
	pageTransition: function(color){
		var self = this;
		$('.nav-overlay').css('background-color',color);

		self.showOverlay();
	},
	showOverlay: function(){
		$('.nav-overlay').css('display','block');

		setTimeout(function(){
			$('#header').addClass('active');
			$('.nav-overlay').addClass('active');
			$('body').css('overflow', 'hidden');
		}, 250);
	},
	hideOverlay: function(){
		// console.log("hide overlay");
		$('.js-main').css('opacity', '1'); // just in case 
		$('#header').removeClass('active');
		$('.nav-overlay').removeClass('active');
		$('body').css('overflow', 'auto');

		setTimeout(function(){
			$('.nav-overlay').css('display','none');
			$('.progress').css('width', '0');
			$('.nav-overlay').css('background-color','#000');
		}, 500)
	},
	showNavItems: function(){
		$('.nav-overlay nav').css('display', 'block');
		$('#current-widget').css('display', 'block');
		$('.nav-overlay .latest').css('display', 'block');
		$('.nav-overlay footer').css('display', 'block');

		setTimeout(function(){
			$('.nav-overlay nav').addClass('active');
			$('#current-widget').addClass('active');
			$('.nav-overlay .latest').addClass('active');
			$('.nav-overlay footer').addClass('active');
		}, 500)
	},
	hideNavItems: function(){
		$('.nav-overlay nav').removeClass('active');
		$('#current-widget').removeClass('active');
		$('.nav-overlay .latest').removeClass('active');
		$('.nav-overlay footer').removeClass('active');

		setTimeout(function(){
			$('.nav-overlay nav').css('display', 'none');
			$('#current-widget').css('display', 'none');
			$('.nav-overlay .latest').css('display', 'none');
			$('.nav-overlay footer').css('display', 'none');
		}, 250)
	}
};
