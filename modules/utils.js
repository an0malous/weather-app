import Weather from './Weather.js';

export const weatherContainerLabel = document.querySelector('#weather-container-label');
export const locationNameLabel = document.querySelector('#location-name');


export const setBackground = () => {
    const time = new Date().getHours();
    switch(true){
      case time >= 19 || time < 6:
        document.body.background  = '../img/alexander-andrews-yOIT88xWkbg-unsplash.jpg';
        break;
      case  time >= 6 && time < 11:
        document.body.background  = '../img/federico-respini-sYffw0LNr7s-unsplash.jpg';
        break;
      case time >= 11  && time < 16:
        document.body.background  = '../img/olly-allars-xjMIfLpGBtM-unsplash.jpg';
        break;
      case time >= 16 && time < 19:
        document.body.background  = '../img/ernest-brillo-Qi8CvonsYnM-unsplash.jpg';
        break;
    }
  }
 
  export const generateWeatherContainers = (data, num) => {
    const weatherContainer = document.querySelector("#weather-container");
    weatherContainerLabel.textContent = "Three Day Forecast";
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

  