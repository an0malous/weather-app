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
			0: 'Sun',
			1: 'Mon',
			2: 'Tue',
			3: 'Wed',
			4: 'Thur',
			5: 'Fri',
			6: 'Sat'
		}
		return daysOfTheWeek[day];
	}
	
	renderWeather () {
		return `
		<header id="weather-date-wrapper">
			<h3 id="date">${this.year}-${this.month + 1}-${this.date}  </h3>
		</header>  ${this.pickDay(this.day)}</div>
		<img alt="Weather Condition" src="http://openweathermap.org/img/wn/${this.icon}@2x.png" />
		<p id="condition">${this.weather}</p>
		<div id="temp-wrapper">
			<div id="min"><i class="fas fa-temperature-low"></i>  ${this.min}°</div>
			<div id="max"><i class="fas fa-temperature-high"></i>  ${this.max}°</div>
		</div>
			`
	}	
}