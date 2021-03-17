const path = require('path');
const express = require('express');
const request = require('postman-request')
const hbs = require('hbs');
const app = express();

const port = process.env.port || 2500;

const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.use(express.static(publicPath))

//weather api
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.5326&lon=35.0998&appid=b79529712f1c0691e6afae708aff98b8';
let weatherData;
request(url, function(error, response) {
    console.log('error:', error); // Print the error if one occurred
    weatherData = JSON.parse(response.body);
});

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('/home', (req, res) => {
    res.render('home', {
        text: 'Welcome To Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        temp: Math.round(weatherData.main.temp - 273.15),
        desc: weatherData.weather[0].description,
    });
});

app.listen(port, () => {
    console.log(`listinig to port ${port}`)
});