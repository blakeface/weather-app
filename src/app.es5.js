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
    var resultsData = results.list[i].main;

    if (weatherData[today]) {
      weatherData[today].temp += resultsData.temp;
      weatherData[today].humidity += resultsData.humidity;
      weatherData[today].pressure += resultsData.pressure;
      weatherData[today].readings++;
    }
    if (!weatherData[today]) {
      weatherData[today] = {
        temp: resultsData.temp,
        humidity: resultsData.humidity,
        pressure: resultsData.pressure,
        readings: 1
      };
    }
    if (today !== next) {
      weatherData[today].temp = (weatherData[today].temp / weatherData[today].readings).toFixed(2);
      weatherData[today].humidity = (weatherData[today].humidity / weatherData[today].readings).toFixed(2);
      weatherData[today].pressure = (weatherData[today].pressure / weatherData[today].readings).toFixed(2);
    }
  }
  console.log('weatherData:', weatherData);
  appendWeatherEl(weatherData);
}

function appendWeatherEl(data) {
  var i = 0;
  for (var key in data) {
    i++;
    var date = moment(key).format('dddd, MMMM Do');
    $('.weather-details').append('<div id="day' + i + '">\n        <h3>' + date + '</h3>\n        <p>Temperature: ' + data[key].temp + '</p>\n        <p>Humidity: ' + data[key].humidity + '</p>\n        <p>Presssure: ' + data[key].pressure + '</p>\n      </div>');
  }
}
