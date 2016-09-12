const APIKEY = '6e1fc93970e4f39c34301ff3e1a16977';
const city = 'Boulder';

$('.root').append(
  `<h1>Weather Forecast for ${city}</h1>
  <div class="weather-details"></div>`
);

$.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${APIKEY}`, successCB)
.fail( err => console.log('err:',err) );

function successCB(results) {
  let weatherData = {};
  console.log('results:',results.list);
  for (let i = 0; i < results.list.length; i++) {
    let today = results.list[i].dt_txt.slice(0,10);
    let next;
    if (results.list[i+1]) next = results.list[i+1].dt_txt.slice(0,10);

    if (weatherData[today]) {
      weatherData[today].data.push(results.list[i]);
    }
    if (!weatherData[today]) {
      weatherData[today] = { temp:0, humidity:0, pressure:0, data:[results.list[i]] };
    }
    if (today !== next) {
      let todaysData = weatherData[today].data;
      for (let j = 0; j < todaysData.length; j++) {
        weatherData[today].temp += todaysData[j].main.temp;
        weatherData[today].humidity += todaysData[j].main.humidity;
        weatherData[today].pressure += todaysData[j].main.pressure;
        if (j === todaysData.length-1) {
          weatherData[today].temp = (weatherData[today].temp / j).toFixed(2);
          weatherData[today].humidity = (weatherData[today].humidity / j).toFixed(2);
          weatherData[today].pressure = (weatherData[today].pressure / j).toFixed(2);
        }
      }
    }
  }
  appendWeatherEl(weatherData);
}

function appendWeatherEl(data) {
  let i = 0;
  for (let key in data) {
    i++;
    $('.weather-details').append(
      `<div id="day${i}">
        <h3>${key}</h3>
        <p>Temperature: ${data[key].temp}</p>
        <p>Humidity: ${data[key].humidity}</p>
        <p>Presssure: ${data[key].pressure}</p>
      </div>`
    );
  }
}
