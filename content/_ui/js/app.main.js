/*

    FILE: app.main.js
    DESCRIPTION: Basic App functions and config
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1

    TO DO:

*/
var APP = window.APP || {};

$(document).ready(function(){
    APP.init();
});

window.APP = {
	init: function() {
		var self = this,
			ua = window.navigator.userAgent,
			iPhone = !!ua.match(/iPhone/i),
			iPad = ua.match(/iPad/i),
			webkit = !!ua.match(/WebKit/i),
			iPhoneSafari = iPhone && webkit && !ua.match(/CriOS/i),
			iPadSafari = iPad && webkit && !ua.match(/CriOS/i),
			msie = ua.indexOf("MSIE ");

		// Since new IE versions don't even accept conditional comment, we have to sniff if it's IE via JS
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ua.match(/Edge/i)) {
			$('body').append('<link rel="stylesheet" href="/_ui/css/IE.css" media="all">');
            $('html').addClass('ie');
        }

		if (iPhoneSafari) { $('html').addClass('iPhoneSafari'); }
		if (iPadSafari) { $('html').addClass('iPadSafari'); }

	    self.events.parent = this;

		if ($('body').hasClass('homepage')) {
			self.nav.openNav();

			setTimeout(function(){
				$('#home-loading').fadeOut(750);
			}, 250)
		}

		self.nav.init();
		self.currentWidget.init();
		self.screensaver.init();

		// Window resize
	    $(window).bind('resize', function(event) {
	        self.events.windowResize({width: self.getMediaWidth()});
	    });

	    $(window).triggerHandler('resize');
	},
	events: {
        windowResize: function (event) {
            var self = this.parent,
                i,
                ii;

            if (event.width >= 800 && self.isMobile) {
				self.isMobile = false;
            } else if (event.width < 800 && !self.isMobile) {
				self.isMobile = true;
            }
        }
    },
    getMediaWidth: function () {
        var self = this,
            width;

        if (typeof matchMedia !== 'undefined') {
            width = self.bruteForceMediaWidth();
        } else {
            width = window.innerWidth || document.documentElement.clientWidth;
        }

        return width;
    },
    bruteForceMediaWidth: function () {
        var i = 0,
            found = false;

        while (!found) {
            if (matchMedia('(width: ' + i + 'px)').matches) {
                found = true;
            } else {
                i++;
            }

            // Prevent infinite loop if something goes horribly wrong
            if (i === 9999) {
                break;
            }
        }

        return i;
    } 
};
