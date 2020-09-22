import {
  loadingSpinner,
  generateLabel,
  locationNameLabel,
  getLocationName,
  postInput,
  regex,
} from "./modules/utils.js";
import { getWeatherData } from "./modules/getWeatherData.js";

const submitBtn = document.querySelector("#submit-btn");

function setBackground() {
  const time = new Date().getHours();
  switch (true) {
    case time >= 19 || time < 6:
      document.body.background = "../img/night.jpg";
      break;
    case time >= 6 && time < 11:
      document.body.background = "../img/morning.jpg";
      break;
    case time >= 11 && time < 16:
      document.body.background = "../img/afternoon.jpg";
      break;
    case time >= 16 && time < 19:
      document.body.background = "../img/evening.jpg";
      break;
  }
}

function initGoogleApi() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC-AIwPCYwuJASspWwGkrDqFlVpTAlpMko&libraries=&v=weekly`;
  script.defer = true;
  document.head.appendChild(script);
}

setBackground();
initGoogleApi();

//Event Listeners to start query
postInput.addEventListener("keyup", (event) =>
  event.keyCode === 13 ? setQuery() : null
); //on press enter
submitBtn.addEventListener("click", setQuery); //on submit button click

function setQuery(event) {
  //checks if there are warning h2's currently rendered to the DOM & removes them
  if (document.querySelector(".warning-label")) {
    document.querySelector(".warning-label").remove();
  }
  if (regex.test(postInput.value)) {
    //request lat and lon vals from google api
    getLatLngByZipcode(postInput.value);
  } else {
    generateLabel(
      "h2",
      document.querySelector("main header"),
      "null",
      "warning-label"
    ).innerText = "Sorry, only valid Japan postal codes (Ex. 167-0022).";
  }
}

export const getLatLngByZipcode = (zipcode) => {
  loadingSpinner.classList.toggle("is-hidden"); // starts loading spinner
  const geocoder = new google.maps.Geocoder();
  const address = zipcode;
  geocoder.geocode({ address: "zipcode " + address }, (results, status) => {
    if (status === "OK") {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();
      locationNameLabel.textContent = getLocationName(
        results[0].address_components
      );
      getWeatherData(latitude, longitude);
    } else {
      generateLabel(
        "h2",
        document.querySelector("main header"),
        "null",
        "warning-label"
      ).innerText =
        "Sorry, either post code does not exist, or there's a connect error.";
      loadingSpinner.classList.add("is-hidden");
    }
  });
};
