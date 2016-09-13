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
    let time = results.list[i].dt_txt.slice(11,19);
    let next;
    if (results.list[i+1]) next = results.list[i+1].dt_txt.slice(0,10);

    let unitData = results.list[i].main;
    let detailedData = results.list[i].weather[0];
    let hourlyData = results.list[i];
    let hourlyObj = {
      id: detailedData.id,
      description: detailedData.description,
      clouds: hourlyData.clouds.all,
      wind: { deg: hourlyData.wind.deg, speed: hourlyData.wind.speed },
      // rain: hourlyData.rain[3h],
      // snow: hourlyData.snow[3h],
    };

    if (weatherData[today]) {
      weatherData[today].temp += unitData.temp;
      weatherData[today].humidity += unitData.humidity;
      weatherData[today].pressure += unitData.pressure;
      if (weatherData[today].temp_min > unitData.temp_min) weatherData[today].temp_min = unitData.temp_min;
      if (weatherData[today].temp_max < unitData.temp_max) weatherData[today].temp_max = unitData.temp_max;
      weatherData[today].readings++;
      weatherData[today].hourly[time] = hourlyObj;
    }

    if (!weatherData[today]) {
      weatherData[today] = {
        temp: unitData.temp,
        temp_min: unitData.temp_min,
        temp_max: unitData.temp_max,
        humidity: unitData.humidity,
        pressure: unitData.pressure,
        readings: 1,
        hourly: {},
      };
      weatherData[today].hourly[time] = hourlyObj;
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
    let date = moment(key).format('dddd, MMMM Do');
    $('.weather-details').append(
      `<div id="day${i}">
        <div class="metrics">
          <h3>${date}</h3>
          <p>Temperature: ${data[key].temp}</p>
          <p>High: ${data[key].temp_max}</p>
          <p>Low: ${data[key].temp_min}</p>
          <p>Humidity: ${data[key].humidity}</p>
          <p>Presssure: ${data[key].pressure}</p>
        </div>
        <div class="bar">
        </div>
      </div>`
    );
    for (let _key in data[key].hourly) {
      console.log(key, _key);
      $(`#id${i} div.bar`).append(
        `<span>${_key}</span>`
      );
    }
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
    'width': '100vw',
  });
}
