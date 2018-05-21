$(function() {
	var $main = $('.js-main'),
  		changedPage = false,

	/* ----- Do this when a page loads ----- */
	init = function() {
		// console.log("init");
		// Change body class
		var newTitle = $('body').find('h1').text(),
			titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
			depth = $(location).prop('pathname').split('/').length - 1;

		$('body').attr('class', '');
		$('body').addClass(titleLower);

		APP.heroFunctions.init();
        APP.maps.init();
		APP.filter.init();
		APP.instantiations.init();
	},

	/* ----- Do this for ajax page loads ----- */
	ajaxLoad = function(result) {
		// console.log("ajaxLoad");

		/* ----- Set the HTML title to the new page title ----- */
		var newTitle = $('body').find('h1').text();

		if (newTitle != "Turnstyle") {
			document.title = newTitle + ' | Turnstyle';
		} else {
			titleLower = 'homepage';
			document.title = newTitle;
		}

		/* ----- Used for popState event (back/forward browser buttons) ----- */
		changedPage = true;

		init();
	},

	loadPage = function(href,color,primary) {
		// console.log("loadPage");

		APP.nav.hideNavItems();

		if (!primary) {
			$('.nav-overlay').css('background-color', color);
			APP.nav.showOverlay();
		}

		setTimeout(function(){
			$main.css('opacity', '0');
		}, 250);

		setTimeout(function(){
			$main.wrapInner('<div class="new-results-div" />');

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			var newResultsHeight = $('.new-results-div').outerHeight();
			$main.height(newResultsHeight);

			scroll(0,0);
		}, 500);

		$.ajax({
			xhr: function(){
				var xhr = new window.XMLHttpRequest();

				//Download progress
    			xhr.addEventListener("progress", function (evt) {
        			if (evt.lengthComputable) {
            			var percentComplete = evt.loaded / evt.total;
            			$('.progress').css({ width: percentComplete * 100 + '%' });
        			} else {
            			$('.progress').css({ width: '100%' });
					}
    			}, false);
    			return xhr;
			},
			type: 'POST',
			url: href,
			async: true,
			data: {},
			success: function(result){
				// console.log("success");
				/* ----- Where the new content is added ----- */
				$main.html(result);

				/* ----- Wrap content in div so we can get it's height ----- */
				$main.wrapInner('<div class="new-results-div" />');

				/* ----- Get height of new container inside results container and set $main to it so there's no content jumpage -----  */
				var newResultsHeight = $('.new-results-div').outerHeight();
				$main.height(newResultsHeight);

				/* ----- Removes the temp height from $main ----- */
				$main.css('height', '');

				$main.css('opacity', '1');

				ajaxLoad(result);
			},
			complete: function(){
				// console.log("complete");
				picturefill();

				setTimeout(function(){
					if ((href == 'http://turnstyle.dev/') || (href == 'http://turnstyle.studio/') || (href == 'http://turnstylestudio.com/')) {
						APP.nav.openNav();
						$('.progress').css('width', '0');
					} else {
	  					APP.nav.hideOverlay();
					}
				}, 500);
			},
			error: function(){
				// console.log("error");
				location.reload();
			}//,
			// timeout: function() {
			// 	console.log("timeout");
			// },
			// statusCode: function(){
			// 	console.log("status code");
			// }
		});
	};

	/* ----- This runs on the first page load with no ajax ----- */
	init();

	$(window).on("popstate", function(e) {
		// -------------------------------------
		//   If there was an AJAX page transition already,
		//   then AJAX page load the requested page from the back or forwards button click.
		//   Variable initially set after the $main variable.
		// -------------------------------------
		// console.log('popstate');
		// console.log(e);
		if (changedPage) {
			var href = $(this).attr("href"),
			primary = $(this).hasClass('nav'),
			color;

			if ($(this).attr('data-color')) { color = $(this).data('color'); }

			loadPage(location.href,color,primary);
			return false;
		}

	});

	$(document).on('click', 'a', function(event) {
		var href = $(this).attr("href"),
			primary = $(this).hasClass('nav'),
			color;

		if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && href != '#') {
			$('.logo .text').removeAttr('style');
			$('a.back').removeAttr('style');

			if ($(this).attr('data-color')) { color = $(this).data('color'); }
			$('.progress').css('width', '5%');

			history.pushState({}, '', href);
			loadPage(href,color,primary);
			return false;
		}
	});
});
