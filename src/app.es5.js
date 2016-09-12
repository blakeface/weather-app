'use strict';

var APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
var city = 'Boulder';

$('.root').append('<h1>Weather Forecast for ' + city + '</h1>\n  <div class="weather-details"></div>');

$.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&APPID=' + APIKEY, successCB).fail(function (err) {
  return console.log('err:', err);
});

function successCB(results) {
  var weatherData = {};
  console.log('results:', results.list);

  for (var i = 0; i < results.list.length; i++) {
    var today = results.list[i].dt_txt.slice(0, 10);
    var next = void 0;
    if (results.list[i + 1]) next = results.list[i + 1].dt_txt.slice(0, 10);

    if (weatherData[today]) {
      weatherData[today].data.push(results.list[i]);
    }
    if (!weatherData[today]) {
      weatherData[today] = { temp: 0, humidity: 0, pressure: 0, data: [results.list[i]] };
    }
    if (today !== next) {
      var todaysData = weatherData[today].data;

      for (var j = 0; j < todaysData.length; j++) {
        weatherData[today].temp += todaysData[j].main.temp;
        weatherData[today].humidity += todaysData[j].main.humidity;
        weatherData[today].pressure += todaysData[j].main.pressure;
        if (j === todaysData.length - 1) {
          weatherData[today].temp /= j;
          weatherData[today].humidity /= j;
          weatherData[today].pressure /= j;
        }
      }
    }
  }
  console.log('weatherData:', weatherData);
}
