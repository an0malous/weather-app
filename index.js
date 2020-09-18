import { setBackground, initMap, weatherContainerLabel, locationNameLabel, getLocationName } from './modules/utils.js';
import { getWeatherData, initGoogleApi} from './modules/api.js'
const map = document.querySelector('#map')
const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#submit-btn");
setBackground();
initGoogleApi();

const getLatLngByZipcode = (zipcode) => {
  map.classList.remove('is-hidden')
  weatherContainerLabel.classList.remove('is-hidden')
  weatherContainerLabel.classList.remove('is-hidden')
  const geocoder = new google.maps.Geocoder();
  const address = zipcode;
  geocoder.geocode({ address: "zipcode " + address }, function (
    results,
    status
  ) {
    if (status === google.maps.GeocoderStatus.OK) {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();
      locationNameLabel.textContent = getLocationName(results[0].address_components)
      initMap(latitude, longitude);
      getWeatherData(latitude, longitude);
    } else {
      weatherContainerLabel.textContent = "Invalid postal Code"
    }
  });
}

submitBtn.addEventListener("click", () => getLatLngByZipcode(postInput.value));
