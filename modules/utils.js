import Weather from './Weather.js';

export const setBackground = () => {
    const time = new Date().getHours();
    time >= 18 || time <= 6 ?
        document.body.background = 'img/stanislav-kondratiev-dLKZWv4PWjo-unsplash.jpg' : 
        document.body.background = 'img/olly-allars-xjMIfLpGBtM-unsplash.jpg';
  }

  export const generateWeatherContainers = (data, num) => {
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainer.innerHTML = '';
    for (let i = 0; i < num; i++) {
        let newWeatherContainer = document.createElement("div");
        newWeatherContainer.id = `container${i + 1}`;
        newWeatherContainer.classList.add("weather");
        const newWeatherInfo = new Weather(data.daily[i]);
        newWeatherContainer.innerHTML = newWeatherInfo.renderWeather()
        weatherContainer.append(newWeatherContainer);
      }
  };

  export const initMap = (lat, lon) => {
    new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 14,
  });
}

  