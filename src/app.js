const APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
const city = 'Boulder';

$('.root').append(
  `<h1>Weather Forecast for ${city}</h1>
  <div class="weather-details"></div>`
);

$.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${APIKEY}`, successCB)
.fail( err => console.log('err:',err) );

function successCB(data) {
  console.log(data);
  let today = data.list[0].dt_txt.slice(0,10);
  let todayData = [];
  let todayTemp = 0;

  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.slice(0,10) == today)
      todayData.push(data.list[i]);
  }

  for (var j = 0; j < todayData.length; j++) {
    todayTemp += todayData[j].main.temp;
  }
  todayTemp = todayTemp / j;

  console.log(todayTemp);

  $('.weather-details').append(
    `<p>Temperature: ${todayTemp}&degF</p>`
  );
}
