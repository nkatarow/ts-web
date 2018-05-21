/*

    FILE: app.screensaver.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.screensaver = {
    init: function() {
		var sleeper = $('#ss');

		if (sleeper.offset().top){
			sleeper.css({ position: 'fixed' });
		}

		$(document).bind('mousemove click keydown touchstart', function(){
			clearTimeout(timer);

			preparetosleep();

			if (sleeper.css('display') !== 'none'){
				sleeper.stop(true, true).css('display', 'none');

				$('html, body').css({width: '', height: '', margin: '', padding: ''});

				$('#ss1').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				$('#ss1').find('.owl-stage-outer').children().unwrap();

				$('#ss2').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				$('#ss2').find('.owl-stage-outer').children().unwrap();

				$('#ss3').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				$('#ss3').find('.owl-stage-outer').children().unwrap();

				$('#ss4').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				$('#ss4').find('.owl-stage-outer').children().unwrap();
			}
		});

		function preparetosleep(){
			timer = setTimeout(function(){
				$('#ss1').owlCarousel({
					autoplay: true,
					loop: true,
					dots: false,
					nav: false,
					responsive: {
						0: { items: 2 },
						400: { items: 3 },
						800: { items: 6 }
					}
				});

				$('.ss-ltr').owlCarousel({
					loop: true,
					dots: false,
					nav: false,
					responsive: {
						0: { items: 2 },
						400: { items: 3 },
						800: { items: 6 }
					}
				});

				$('.ss-rtl').owlCarousel({
					loop: true,
					dots: false,
					nav: false,
					rtl: true,
					responsive: {
						0: { items: 2 },
						400: { items: 3 },
						800: { items: 6 }
					}
				});

				$('#ss1').on('change.owl.carousel', function(event) {
					$('#ss2').trigger('next.owl.carousel');
				  	$('#ss3').trigger('next.owl.carousel');
				  	$('#ss4').trigger('next.owl.carousel');
				})

				$('html, body').css({width: '100%', height: '100%', margin: 0, padding: 0});

				sleeper.stop(true, true).css('display', 'block');

				$('#ss1').owlCarousel({ autoplay: true });
			}, 600000);
		}

		preparetosleep();
	}
}
