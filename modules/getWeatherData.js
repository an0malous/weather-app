import { displayWeatherTrends } from "./displayWeatherTrends.js";
import WeatherDataTemplate from "./WeatherDataTemplate.js";
import { generateLabel, loadingSpinner, postInput, regex } from "./utils.js";
const api = {
  base: "https://api.openweathermap.org/data/2.5/onecall?",
  KEY: "5d020c5c368a5eab9c90bab8ff434f18",
  exclude: "minutely, hourly",
  units: "metric",
  language: "en",
};

export async function getWeatherData(lat, lng) {
  try {
    const res = await fetch(
      api.base +
        `lat=${lat}&lon=${lon}&exclude=${api.exclude}&units=${api.units}&appid=${api.KEY}`
    );
    res.json().then((data) => {
      const main = document.querySelector("main");
      initMap(lat, lng);
      displayWeatherResults(data, 3);
      main.classList.remove("centered");
      loadingSpinner.classList.add("is-hidden");
      map.classList.remove("is-hidden");
      displayWeatherTrends(data);
    });
  } catch (err) {
    console.log(err);
    generateLabel(
      "h2",
      document.querySelector("main header"),
      "null",
      "warning-label"
    ).innerHTML = "Sorry could not display Weather (Check your add blocker).";
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
  generateLabel(
    "h2",
    document.querySelector("#location-container"),
    "location-label",
    "container-label"
  ).textContent = "Location";
  var myLatlng = new google.maps.LatLng(lat, lon);
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Place a draggable marker on the map
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: true,
    title: "Drag me to get the Weather somewhere else",
  });

  map.addListener("center_changed", function () {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function () {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  //take pin coordinates and get postal code 
  marker.addListener("click", function () {
    map.setCenter(marker.getPosition());
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    myLatlng = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: myLatlng }, function (results, status) {
      if (status === "OK") {
        const res =
          results[0].address_components[
            results[0].address_components.length - 1
          ].long_name;
        //test to see if new Latlng is japan postal code.
        if (regex.test(res)) {
          //if jp postal code put result val into <input>
          postInput.value = res;
        } else {
          generateLabel(
            "h2",
            document.querySelector("main header"),
            "null",
            "warning-label"
          ).innerText =
            "Sorry, selected location does not have a valid Japane postal code.";
        }
      } else {
        generateLabel(
          "h2",
          document.querySelector("main header"),
          "null",
          "warning-label"
        ).innerText = "A connection error occured. Please try again later.";
      }
    });
  });
}
