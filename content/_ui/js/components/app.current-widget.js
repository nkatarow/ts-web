/*

    FILE: app.current-widget.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.currentWidget = {
    init: function() {
		var self = this;
			date = new Date(),
			formattedDate = self.formatAmPm(date);

		$('#current-widget .time').append(formattedDate);

		self.getWeather();
	},
	formatAmPm: function(date) {
		var hours = date.getHours(),
			minutes = date.getMinutes(),
			ampm = hours >= 12 ? 'pm' : 'am',
			strTime;

		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		strTime = hours + ':' + minutes + ' <span>' + ampm + '</span>';

		return strTime;
	},
	getWeather: function() {
		var self = this,
			key = 'f33fcf07b8fbecf1917b9549656eee02',
			cityId = 5809844,
			apiEndpoint = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=' + key + '&units=imperial';

		$.ajax({
			dataType: "json",
			url: apiEndpoint,
			data: {},
			success: function(result){
				$('#current-widget .weather-desc').append('<span>' + result.weather[0].main + '</span>');
				$('#current-widget .weather-desc').append('<span>' + Math.round(result.main.temp) + '&deg;</span>');
			}
		});
	}

}; // End: component
