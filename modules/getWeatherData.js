import { displayWeatherTrends } from './displayWeatherTrends.js';
import WeatherDataTemplate from './WeatherDataTemplate.js';
import { generateLabel, loadingSpinner } from './utils.js';

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
  new google.maps.Map(document.getElementById("map"), {
  center: { lat: lat, lng: lon },
  zoom: 14,
});
}