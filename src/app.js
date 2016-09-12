const APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
$.get('http://api.openweathermap.org/data/2.5/forecast?q=London,us&APPID=' + 'APIKEY')
.then(data => console.log(data));
