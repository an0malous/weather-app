export default class Weather {
	constructor(data){
		this.year = new Date(data.dt * 1000).getFullYear();
		this.month = new Date(data.dt * 1000).getMonth();
		this.date = new Date(data.dt * 1000).getDate();
		this.day = new Date(data.dt * 1000).getDay();
		this.avg = data.temp.day;
		this.min = data.temp.min;
		this.max = data.temp.max;
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
		<div id="weather-date-wrapper">
			<div id="date">${this.year}-${this.month + 1}-${this.date}  </div>
			<div>  ${this.pickDay(this.day)}</div>
		</div>
				
				<div id="icon"><img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" /></div>
				<div id="condition">${this.weather}</div>
				<div id="temp-wrapper">
					<div id="min">Min:  ${this.min}</div>
					<div id=max">Max:  ${this.max}</div>
				</div>
			`
	}	
}