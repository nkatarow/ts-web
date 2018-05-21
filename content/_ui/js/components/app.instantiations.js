/*

    FILE: app.instantiations.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.instantiations = {
    init: function() {
		var self = this,
			prev = 0;

		// Carousel
		$('.owl-default').owlCarousel({
			center: true,
			loop: true,
			dots: true,
			responsive: {
				0: {
					items: 1,
					autoHeight: true,
				},
				1200: {
					items: 2,
					autoWidth: true,
					margin: 50,
				}
			}
		});

		// Lazy load images
		if (Modernizr.touch) {
			$('img.lazy').lazyload({
				event: 'touchmove',
				threshold: 300
			});
		} else {
			$('img.lazy').lazyload({
				effect: 'fadeIn',
				effectspeed: 250,
				threshold: 300
			});
		}

		$('.video-module video').each(function(){
      if ($(this).hasClass('autoplay')) {
				this.addEventListener('loadeddata', function() {
				  this.play();
				});
      }
    });

		$('.inset-image video').each(function(){
      if ($(this).hasClass('autoplay')) {
				this.addEventListener('loadeddata', function() {
				  this.play();
				});
      }
    });

		// Reveal animations
		$('.reveal').each(function(){
			reveal = new Waypoint.Inview({
				element: $(this),
  				enter: function() {
					$(this.element).addClass('fadeInUp animated');
				}
			})
		});

		$('.full-reveal').each(function(){
			reveal = new Waypoint.Inview({
				element: $(this),
  				enter: function() {
					$(this.element).addClass('fadeIn animated');
				}
			})
		});

		$('.sequence').each(function(){
			sequence = new Waypoint.Inview({
				element: $(this),
  				enter: function() {
					var parent = $(this.element).attr('id');

					$('#' + parent).find('.seq:first-child').addClass('fadeInUp animated');

					setTimeout(function(){
						$('#' + parent).find('.seq:nth-child(2)').addClass('fadeInUp animated');
					}, 500);
				}
			})
		});

		if ($('.hero').length) {
			var $hero = $('.hero');
    		var h = window.innerHeight;
    		$hero.css('min-height', h);
		}

		if ($('#instafeed').length) {
			var feed = new Instafeed({
		        get: 'user',
				target: 'instafeed',
				userId: '1272260908',
				resolution: 'standard_resolution',
				sortBy: 'most-recent',
				limit: 3,
				accessToken: '1272260908.3d318e0.f0508a96bbfe4ea5acb3300bf3c7b506',
		        template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'

		    });
		    feed.run();
		}

		$(window).on('scroll', function(){
			var scrollTop = $(window).scrollTop();
			if (prev > 0) {
				$('#header').toggleClass('hidden', scrollTop > prev);

				if ($('.back').length) { $('.back').toggleClass('hidden', scrollTop > prev); }
				if ($('#filter-trigger').length) { $('#filter-trigger').toggleClass('hidden', scrollTop > prev); }
			}
			prev = scrollTop;
		});
	}
}
