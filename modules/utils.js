import Weather from './Weather.js';

export const locationNameLabel = document.querySelector('#location-name');

export const generateLabel = (tag, prependTo, id , className) => {
  if(document.querySelector(`#${id}`)){
    document.querySelector(`#${id}`).remove()
  }
  const label = document.createElement(tag)
  if(className){
    label.classList.add(className)
  }
  if(id){
    label.id = id
  }
  prependTo.prepend(label)
 
  return document.querySelector(`#${id}`)
}


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
    generateLabel("h2", document.querySelector('#forecast'), "weather-container-label", "container-label").textContent = "3 Day Forecast"
    weatherContainer.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const newWeatherContainer = document.createElement("article");
        newWeatherContainer.id = `container${i + 1}`;
        newWeatherContainer.classList.add("weather");
        const newWeatherInfo = new Weather(data.daily[i]);
        newWeatherContainer.innerHTML = newWeatherInfo.renderWeather()
        weatherContainer.append(newWeatherContainer);
      }
  };

  export const initMap = (lat, lon) => {
    generateLabel("h2", document.querySelector('#location-container'), "location-label", "container-label").textContent = "Location";
    new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 14,
  });
}

export const getLocationName = (api) => { //takes api results & filter parameters
  const validTypes = api.filter(item=>(item.types.includes("postal_code") || item.types.includes("country")) === false)
  const result = validTypes
    .map((item)=>item.long_name)
    .reduce((next, curr)=> curr + ", " + next, )
  return result;
}




  