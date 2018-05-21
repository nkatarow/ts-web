/*

    FILE: app.maps.js
    DESCRIPTION: Dynamically creates google maps element with address entered in CMS
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - Google Maps API
    - jQuery 1.9.1

*/

APP.maps = {
    init: function (addr) {
	    if($('.map-canvas').length) {
		    var self = this;
	        var styles = [
				{
					"elementType": "labels",
					"stylers": [
						{ "visibility": "off" }
					]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "geometry",
					"stylers": [
						{ "visibility": "off" }
					]
				},
				{
					"featureType": "landscape.natural",
					"stylers": [
						{ "color": "#3400ff" }
					]
				},
				{
					"featureType": "poi",
					"stylers": [
						{ "visibility": "off" }
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
						{ "color": "#1f00b5" },
						{ "visibility": "simplified" },
						{ "weight": 1 }
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{ "visibility": "off" }
					]
				},
				{
					"featureType": "water",
					"stylers": [
						{ "color": "#000000" }
					]
				}
			];

	        var geocoder = new google.maps.Geocoder(styles);
	        var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map"} );

	        var mapOptions = {
	            zoom: 14,
	            draggable: true,
	            scrollwheel: false,
	            disableDefaultUI: true,
	            mapTypeControlOptions: {
	                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	            },
	            zoomControl: true,
	            zoomControlOptions: {
	                style: google.maps.ZoomControlStyle.SMALL
	            }
	        };


			$('.map-canvas').each(function(){
				var id = $(this).attr('id');
				var addr = $(this).data('address');

		        var map = new google.maps.Map(document.getElementById(id), mapOptions);
		        map.mapTypes.set('map_style', styledMap);
		        map.setMapTypeId('map_style');
	        	self.codeAddress(addr, geocoder, map);
			});
		}
    }, // END: init


    codeAddress: function(addr, geocoder, map) {
        geocoder.geocode( {'address': addr}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);

                var image = {
                    url: '/_ui/img/global/map-pin.svg',
                    size: new google.maps.Size(36, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(18, 21)
                };

                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode not successful!');
            }
        });
    } // END: codeAddress

}; // END: maps
