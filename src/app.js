const APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
const city = 'Boulder';

$.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIKEY}`)
.then( results => console.log('results:',results) );
