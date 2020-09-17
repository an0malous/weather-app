import { setBackground, initMap } from './modules/utils.js';
import { getWeatherData, initGoogleApi} from './modules/api.js'

const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#submit-btn");
setBackground();
initGoogleApi();

const getLatLngByZipcode = (zipcode) => {
  const geocoder = new google.maps.Geocoder();
  const address = zipcode;
  geocoder.geocode({ address: "zipcode " + address }, function (
    results,
    status
  ) {
    if (status == google.maps.GeocoderStatus.OK) {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();
      initMap(latitude, longitude);
      getWeatherData(latitude, longitude);
    } else {
      console.log("Request Failed")
    }
  });
}

submitBtn.addEventListener("click", () => getLatLngByZipcode(postInput.value));
