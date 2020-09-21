export default class Weather {
	constructor(data){
		this.year = new Date(data.dt * 1000).getFullYear();
		this.month = new Date(data.dt * 1000).getMonth();
		this.date = new Date(data.dt * 1000).getDate();
		this.day = new Date(data.dt * 1000).getDay();
		this.avg = data.temp.day;
		this.min = Math.floor(data.temp.min)
		this.max = Math.floor(data.temp.max)
		this.icon = data.weather[0].icon
		this.weather = data.weather[0].description;

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
	
	renderWeather () {
		return `
		<header class="date" id="weather-date-wrapper">
			<h3>${this.year}-${this.month + 1}-${this.date}  </h3>
			 <div>${this.pickDay(this.day)}</div>
		</header> 
		<img alt="Weather Condition" src="http://openweathermap.org/img/wn/${this.icon}@2x.png" />
		<p id="condition">${this.weather}</p>
		<div id="temp-wrapper">
			<div id="min"><i class="fas fa-temperature-low"></i>  ${this.min}°</div>
			<div id="max"><i class="fas fa-temperature-high"></i>  ${this.max}°</div>
		</div>
			`
	}	
}