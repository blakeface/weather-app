'use strict';

var APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
var city = 'Boulder';

$.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + APIKEY).then(function (results) {
  return console.log('results:', results);
});
