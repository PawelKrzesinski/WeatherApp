
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

document.addEventListener('DOMContentLoaded', () => {
	let long;
	let lat;

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely,hourly,daily}&appid=${API_KEY}&units=metric`
			fetch(url)
			.then(response => {
				let data = response.json();
				return data;
			})
			.then(data =>{
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
				temp__div.innerHTML = information[9];
				sunrise__div.innerHTML = information[0];
				sunset__div.innerHTML = information[1];
				desc__div.innerHTML = information[2];
				weatherIcon__div.innerHTML = information[3];
				pressure__div.innerHTML = information[4];
				humidity__div.innerHTML = information[5];
				feelsLike__div.innerHTML = information[6];
				windSpeed__div.innerHTML = information[7];
				timezone__div.innerHTML = information[8];
			})
			.catch(err => {
				console.log(err);
			});
		})
		
	}
})
