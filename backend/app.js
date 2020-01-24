const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config({path: 'backend/.env'});
const serverless = require('serverless-http');
const app = express();
const PORT = process.env.PORT || "3000";


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/weather/:lat/:lon', async (req, res, next) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const weather_api_key = process.env.WEATHER_API_KEY;
  const response = await fetch(`https://api.darksky.net/forecast/${weather_api_key}/${lat},${lon}`);
  const weatherData = await response.json();
  res.json(weatherData);
});

app.get('/reverseGeocode/:lat/:lon', async (req, res, next) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const google_api_key = process.env.GOOGLE_API_KEY;
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${google_api_key}`)
  const reverseGeocodeData = await response.json();
  res.json(reverseGeocodeData);
});

app.get('/searchLocation/:input', async (req, res, next) => {
  const input = req.params.input;
  const google_api_key = process.env.GOOGLE_API_KEY;
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${google_api_key}`)
  const searchData = await response.json()
  res.json(searchData);
});

app.get('/locationDetails/:id', async (req, res, next) => {
  const place_id = req.params.id;
  const google_api_key = process.env.GOOGLE_API_KEY;
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${google_api_key}`);
  const locationDetails = await response.json();
  res.json(locationDetails);
});

module.exports.handler = serverless(app);
