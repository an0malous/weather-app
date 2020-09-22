import { displayWeatherTrends } from './displayWeatherTrends.js';
import WeatherDataTemplate from './WeatherDataTemplate.js';
import { generateLabel, loadingSpinner, locationNameLabel, getLocationName, postInput } from './utils.js';
import { getLatLngByZipcode } from '../index.js'
const api = {
  base: "https://api.openweathermap.org/data/2.5/onecall?",
  KEY: "5d020c5c368a5eab9c90bab8ff434f18",
  exclude: "minutely, hourly",
  units: "metric",
  language: "en",
};

export async function getWeatherData(lat, lon) {
  try {
    const res = await fetch(
      api.base +
        `lat=${lat}&lon=${lon}&exclude=${api.exclude}&units=${api.units}&appid=${api.KEY}`
    );
    res.json().then((data) => {
      const main = document.querySelector("main");
      initMap(lat, lon)
      displayWeatherResults(data, 3);
      main.classList.remove("centered");
      loadingSpinner.classList.add("is-hidden");
      map.classList.remove("is-hidden");
      displayWeatherTrends(data);
    });
  } catch (err) {
    console.log(err)
    loadingSpinner.classList.add("is-hidden");
  }
}

const displayWeatherResults = (api, numOfContainers) => {
  const weatherWrapper = document.querySelector("#weather-container");
  generateLabel(
    "h2",
    document.querySelector("#forecast"),
    "weather-container-label",
    "container-label"
  ).textContent = "3 Day Forecast";
  weatherWrapper.innerHTML = "";
  for (let i = 0; i < numOfContainers; i++) {
    const newContainer = document.createElement("article");
    newContainer.id = `container${i + 1}`;
    newContainer.classList.add("weather");
    const newWeatherInfo = new WeatherDataTemplate(api.daily[i]);
    newContainer.innerHTML = newWeatherInfo.render();
    weatherWrapper.append(newContainer);
  }
};

function initMap(lat, lon) {
  generateLabel("h2", document.querySelector('#location-container'), "location-label", "container-label").textContent = "Location";
  var myLatlng = new google.maps.LatLng(lat, lon);
var mapOptions = {
  zoom: 14,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// Place a draggable marker on the map
var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable:true,
    title:"Drag me to get the Weather somewhere else"
});

map.addListener('center_changed', function() {
  // 3 seconds after the center of the map has changed, pan back to the
  // marker.
  window.setTimeout(function() {
    map.panTo(marker.getPosition());
  }, 2000);
});

marker.addListener('click', function() {
  map.setCenter(marker.getPosition());
  var lat = marker.getPosition().lat();
  var lon = marker.getPosition().lng();

  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': myLatlng }, async function(results, status) {
  
      try {
        postInput.value = results[0].address_components[results[0].address_components.length - 1].long_name        
        getWeatherData(lat, lon)
      } catch (error){
        generateLabel(
          "h2",
          document.querySelector("main header"),
          "api-warning",
          "warning-label"
        ).innerText = `Sorry, could not get location information. Please try a different location.`;
      }
    })

  

});
}

