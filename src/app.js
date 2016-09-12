const APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
const city = 'Boulder';

$('.root').append(
  `<h1>Weather Forecast for ${city}</h1>
  <div class="weather-details"></div>`
);

$.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${APIKEY}`, successCB)
.fail( err => console.log('err:',err) );

function successCB(results) {
  console.log(results);
  let today = results.list[0].dt_txt.slice(0,10);
  let todayData = {
    temp: 0,
  };
  let count = 0;

  for (let i = 0; i < results.list.length; i++) {
    if (results.list[i].dt_txt.slice(0,10) == today) {
      count++;
      todayData.temp += results.list[i].main.temp;
    }
  }
  todayData.temp /= count;

  $('.weather-details').append(
    `<p>Temperature: ${todayData.temp}&degF</p>`
  );
}
