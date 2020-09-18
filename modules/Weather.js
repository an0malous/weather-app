export default class Weather {
	constructor(data){
		this.year = new Date(data.dt * 1000).getFullYear();
		this.month = new Date(data.dt * 1000).getMonth();
		this.date = new Date(data.dt * 1000).getDate();
		this.avg = data.temp.day;
		this.min = data.temp.min;
		this.max = data.temp.max;
		this.weather = data.weather[0].description;
	}
	
	renderWeather () {
		return `

				<div id="date">${this.year}-${this.month + 1}-${this.date}</div>
				<div id="condition">${this.weather}</div>
				<div id="temp-wrapper">
					<div id="min">Min:  ${this.min}</div>
					<div id=max">Max:  ${this.max}</div>
				</div>
				
		
			`
	}	
}