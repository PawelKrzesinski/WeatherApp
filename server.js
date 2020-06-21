const express = require('express');
const app = express();
require('dotenv').config();

app.listen(3000, () => console.log("Ha ha i'm behind you"))
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
	console.log(request.body);
	const data = request.body;
	response.json({
		status: 'success',
		latitude: data.lat,
		longitude: data.long
	})
})