import { setBackground, initMap, locationNameLabel, getLocationName, generateLabel } from './modules/utils.js';
import { getWeatherData, initGoogleApi} from './modules/api.js'

const main = document.querySelector('main')
const loadingSpinner = document.querySelector('#loading-spinner')
const warningLabels = document.querySelectorAll('.warning-label');
const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#submit-btn");
setBackground();
initGoogleApi();


const getLatLngByZipcode = (zipcode) => {
  loadingSpinner.classList.toggle('is-hidden')
  const geocoder = new google.maps.Geocoder();
  const address = zipcode;
  geocoder.geocode({ address: "zipcode " + address }, async function (
    results,
    status
  ) {
 
      try {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        
        locationNameLabel.textContent = getLocationName(results[0].address_components)
        await getWeatherData(latitude, longitude);
        main.classList.remove('centered')
        loadingSpinner.classList.add('is-hidden');
        map.classList.remove('is-hidden')
        initMap(latitude, longitude);
      } catch (error){
        loadingSpinner.classList.add('is-hidden');
        generateLabel("h2", document.querySelector('main header'), "api-warning", "warning-label").textContent = `Sorry either the postal code you entered does not exist or there's a connection problem.`
      }
    
  });
}
postInput.addEventListener("keyup", () =>{
    if(document.querySelector('.warning-label')){
      document.querySelector('.warning-label').remove();
    }
    if (event.keyCode === 13) {
      event.preventDefault();
      getLatLngByZipcode(postInput.value);
  }
})

submitBtn.addEventListener("click", () => getLatLngByZipcode(postInput.value))