const express = require('express');
const app = express();
const fetch = require('node-fetch')
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Starting Server at ${port}`)
})
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.post('/api', (request, response) => {
	const data = request.body;
	response.json({
		status: 'success',
		latitude: data.lat,
		longitude: data.lon
	})
})

app.get('/weather/:latlon', async (request, response) => {
	const latlon = request.params.latlon.split(',');
	console.log(latlon);
	const lat = latlon[0];
	const lon = latlon[1];
	console.log(lat, lon);
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,daily}&appid=${API_KEY}&units=metric`
	const fetch_response = await fetch(url);
	const json = await fetch_response.json();
	response.json(json);
})
