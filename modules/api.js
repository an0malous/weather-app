import * as keys from './keys.js';
import { generateWeatherContainers } from './utils.js'

export async function getWeatherData(lat, lon) {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
                exclude=minutely,hourly&units=metric&appid=${keys.openWeather}`
    try {
      const res = await fetch(api);
      res.json().then((data) => {
        generateWeatherContainers(data, 3)
      });
    } catch (err) {
      console.log(err);
    }
  }


export const initGoogleApi = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.google}&libraries=&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);
};

    