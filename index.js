import { setBackground, initMap, weatherContainerLabel, locationNameLabel } from './modules/utils.js';
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
      const validTypes = results[0].address_components.filter(item=> (item.types.includes("postal_code") || item.types.includes("country")) === false)
        let y = validTypes
        .map((item)=>item.long_name)
        .reduce((next, curr)=> curr + ", " + next, )
      locationNameLabel.textContent = y

      initMap(latitude, longitude);
      getWeatherData(latitude, longitude);
    } else {
      weatherContainerLabel.textContent = "Invalid postal Code"
    }
  });
}

submitBtn.addEventListener("click", () => getLatLngByZipcode(postInput.value));
