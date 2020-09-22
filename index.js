import {
  loadingSpinner, generateLabel
} from "./modules/utils.js";
import { getWeatherData } from './modules/getWeatherData.js'

const postInput = document.querySelector("#post-input");
const submitBtn = document.querySelector("#submit-btn");
const locationNameLabel = document.querySelector('#location-name');

function setBackground() {
  const time = new Date().getHours();
  switch(true){
    case time >= 19 || time < 6:
      document.body.background  = '../img/night.jpg';
      break;
    case  time >= 6 && time < 11:
      document.body.background  = '../img/morning.jpg';
      break;
    case time >= 11  && time < 16:
      document.body.background  = '../img/afternoon.jpg';
      break;
    case time >= 16 && time < 19:
      document.body.background  = '../img/evening.jpg';
      break;
  }
}
function initGoogleApi() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC-AIwPCYwuJASspWwGkrDqFlVpTAlpMko&libraries=&v=weekly`;
  script.defer = true;
  document.head.appendChild(script);
};

setBackground();
initGoogleApi();

//Event Listeners to start query
postInput.addEventListener("keyup", event=>event.keyCode === 13 ? setQuery(): null)  //on press enter 
submitBtn.addEventListener("click", setQuery) //on submit button click


function setQuery(event){
  //checks if there are warning h2's currently rendered to the DOM & removes them
  if (document.querySelector(".warning-label")) {
    document.querySelector(".warning-label").remove();
  }
  //request lat and lon vals from google api
  getLatLngByZipcode(postInput.value)
}

const getLatLngByZipcode = (zipcode) => {
  loadingSpinner.classList.toggle("is-hidden"); // starts loading spinner
  const geocoder = new google.maps.Geocoder();
  const address = zipcode;
  geocoder.geocode({ address: "zipcode " + address }, async (
    results,
    status
    )=> {
    try {
      const latitude = results[0].geometry.location.lat(); 
      const longitude = results[0].geometry.location.lng();
  
      locationNameLabel.textContent = getLocationName(
        results[0].address_components
      );
      await getWeatherData(latitude, longitude);
      //initMap(latitude, longitude);
    } catch (error) {
      console.log(error)
      loadingSpinner.classList.add("is-hidden");
      generateLabel(
        "h2",
        document.querySelector("main header"),
        "api-warning",
        "warning-label"
      ).innerText = `Sorry either the postal code you entered does not exist or there's a connection problem.`;
    }
  })
}

function getLocationName(api) { //takes api results & filters parameters
  const validTypes = api.filter(item=>(item.types.includes("postal_code") || item.types.includes("country")) === false)
  const result = validTypes
    .map((item)=>item.long_name)
    .reduce((next, curr)=> curr + ", " + next, )
  return result;
}

