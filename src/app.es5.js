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
    var time = results.list[i].dt_txt.slice(11, 19);
    var next = void 0;
    if (results.list[i + 1]) next = results.list[i + 1].dt_txt.slice(0, 10);
    var unitData = results.list[i].main;
    var detailedData = results.list[i].weather[0];
    var wind = results.list[i].wind;
    var cloud = results.list[i].clouds;

    if (weatherData[today]) {
      weatherData[today].temp += unitData.temp;
      weatherData[today].humidity += unitData.humidity;
      weatherData[today].pressure += unitData.pressure;
      if (weatherData[today].temp_min > unitData.temp_min) weatherData[today].temp_min = unitData.temp_min;
      if (weatherData[today].temp_max < unitData.temp_max) weatherData[today].temp_max = unitData.temp_max;
      weatherData[today].readings++;
      weatherData[today].hourly[time] = {
        description: detailedData.description,
        id: detailedData.id,
        clouds: cloud.all,
        wind: { deg: wind.deg, speed: wind.speed }

      };
    }
    if (!weatherData[today]) {
      weatherData[today] = {
        temp: unitData.temp,
        temp_min: unitData.temp_min,
        temp_max: unitData.temp_max,
        humidity: unitData.humidity,
        pressure: unitData.pressure,
        readings: 1,
        hourly: {}
      };
      weatherData[today].hourly[time] = { description: detailedData.description, id: detailedData.id };
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
    $('.weather-details').append('<div id="day' + i + '">\n        <div class="metrics">\n          <h3>' + date + '</h3>\n          <p>Temperature: ' + data[key].temp + '</p>\n          <p>High: ' + data[key].temp_max + '</p>\n          <p>Low: ' + data[key].temp_min + '</p>\n          <p>Humidity: ' + data[key].humidity + '</p>\n          <p>Presssure: ' + data[key].pressure + '</p>\n        </div>\n        <div class="bar">\n        </div>\n      </div>');
  }
  styleEl();
}

function styleEl() {
  $("body, div:parent").css({
    'margin': '0px',
    'display': 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'center',
    'align-items': 'center',
    'width': '100vw'
  });
}
