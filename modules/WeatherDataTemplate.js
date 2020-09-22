export default class WeatherContainer {
	constructor({dt, temp, weather }){
		this.year = new Date(dt * 1000).getFullYear();
		this.month = new Date(dt * 1000).getMonth();
		this.date = new Date(dt * 1000).getDate();
		this.day = new Date(dt * 1000).getDay();
		this.avg = temp.day;
		this.min = Math.round(temp.min)
		this.max = Math.round(temp.max)
		this.icon = weather[0].icon
		this.weather = weather[0].description;
	}

	pickDay(day){
		const daysOfTheWeek = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		}
		return daysOfTheWeek[day];
	}
	
	render() {
		return `
		<header class="date" id="weather-date-wrapper">
			<h3>${this.year}-${this.month + 1}-${this.date}  </h3>
			 <div>${this.pickDay(this.day)}</div>
		</header> 
		<img alt="Weather Condition" src="http://openweathermap.org/img/wn/${this.icon}@2x.png" />
		<p id="condition">${this.weather}</p>
		<div id="temp-wrapper">
			<div id="min"><i class="fas fa-temperature-low"></i>  ${this.min}°C</div>
			<div id="max"><i class="fas fa-temperature-high"></i>  ${this.max}°C</div>
		</div>
			`
	}	
}