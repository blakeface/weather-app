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
    let resultsData = results.list[i].main;

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
        readings: 1,
      };
    }
    if (today !== next) {
      weatherData[today].temp = (weatherData[today].temp / weatherData[today].readings).toFixed(2);
      weatherData[today].humidity = (weatherData[today].humidity / weatherData[today].readings).toFixed(2);
      weatherData[today].pressure = (weatherData[today].pressure / weatherData[today].readings).toFixed(2);
    }
  }
  console.log('weatherData:',weatherData);
  appendWeatherEl(weatherData);
}

function appendWeatherEl(data) {
  let i = 0;
  for (let key in data) {
    i++;
    let date = moment(key, 'YYYY-DD-MM');
    $('.weather-details').append(
      `<div id="day${i}">
      <h3>${date}</h3>
      <p>Temperature: ${data[key].temp}</p>
      <p>Humidity: ${data[key].humidity}</p>
      <p>Presssure: ${data[key].pressure}</p>
      </div>`
    );
  }
}
