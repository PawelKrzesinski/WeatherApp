const temp__div = document.getElementById('temp');
const sunrise__div = document.getElementById('sunrise');
const sunset__div = document.getElementById('sunset');
const desc__div = document.getElementById('desc');
const weatherIcon__div = document.getElementById('icon');
const pressure__div = document.getElementById('pressure');
const humidity__div = document.getElementById('humidity');
const feelsLike__div = document.getElementById('feels__like');
const windSpeed__div = document.getElementById('wind__speed');
const timezone__div = document.getElementById('timezone');
let lon;
let lat;

document.addEventListener('DOMContentLoaded', () => {
	if(navigator.geolocation){
		function getData(){
		navigator.geolocation.getCurrentPosition(async position => {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			let url = `weather/${lat},${lon}`;
			const items = { lat, lon };
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(items)
			};

			const response = await fetch('/api', options);
			const json = await response.json();
			console.log(json);
			
			fetch(url).then(response => {
				let data = response.json();
				return data;
			}).then(data =>{
				let sunrise = data.current.sunrise;
				let sunset = data.current.sunset;
				let desc = data.current.weather[0].main;
				let weatherIcon = data.current.weather[0].icon;
				let pressure = data.current.pressure;
				let humidity = data.current.humidity;
				let feelsLike = data.current.feels_like;
				let windSpeed = data.current.wind_speed;
				let timezone = data.timezone;
				let temp = data.current.temp;
				let information = [sunrise, sunset, desc, weatherIcon, pressure, humidity, feelsLike, windSpeed, timezone, temp]
				return information;
			}).then((information) => {
				sunrise__div.innerHTML = `Sunrise: ${unixToDate(information[0])}`;
				sunset__div.innerHTML = `Sunset: ${unixToDate(information[1])}`;
				desc__div.innerHTML = information[2];
				weatherIcon__div.innerHTML = `<img src='https://openweathermap.org/img/wn/${information[3]}@2x.png' class='icon__image'/>`;
				pressure__div.innerHTML = `Pressure:  ${information[4]} Pa`;
				humidity__div.innerHTML = `Humidity: ${information[5]} %`;
				feelsLike__div.innerHTML = `Feels like: ${Math.round(information[6])} &degC`;
				windSpeed__div.innerHTML = `Wind speed: ${information[7]} m/s`;
				timezone__div.innerHTML = information[8];
				temp__div.innerHTML = `Temp: ${Math.round(information[9])} &degC`;
				console.log("New Data");
			})
			.catch(err => {
				console.log(err);
			});
			
		})
	}}
	getData();
	refresh(getData, 300000);
})

function unixToDate(unix) {
	const date = new Date(unix * 1000);
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return hours + ":" + minutes + ":" + seconds;
}

function refresh(getData, time){
	setInterval(getData, time)
}
