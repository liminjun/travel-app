const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();

//default API key and url.
const darkSkyKEY = process.env.darkSkyKEY;
const darkSkyURL = 'https://api.darksky.net/forecast/';

const pixabayKEY = process.env.pixabayKEY;
const pixabayURL = 'https://pixabay.com/api/?';





const express = require('express');
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('./dist'))

const port = 8090;

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('./dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log('Example app listening on port 8090!')
})
const travelData = [];
app.get('/list', function (req, res) {
    res.send(travelData);
})

//Add travel data.
app.post('/add', function (req, res) {
    const requestBody = req.body;
    let data = {};

    data.location = requestBody.location;
    data.countryName = requestBody.countryName;
    data.latitude = requestBody.latitude;
    data.longitude = requestBody.longitude;
    data.goDate = requestBody.goDate;
    data.duration = requestBody.duration;

    const weatherPromise = new Promise((resolve, reject) => {
        darksky(data.latitude, data.longitude).then(function (response) {
         
            resolve(response);
        });
    });
    const imagePromise = new Promise((resolve, reject) => {
        pixabay(data.location).then(function (response) {
   
            resolve(response);
        });
    });

    Promise.all([weatherPromise, imagePromise]).then(function (results) {

    
        const weatherData = results[0];
        const imageData = results[1];
        data.dailySummary = weatherData.daily.data[0].summary;
        data.temperatureMin = weatherData.daily.data[0].temperatureMin;

        data.temperatureMax = weatherData.daily.data[0].temperatureMax;

        if (imageData.totalHits > 0) {
            data.imageUrl = imageData.hits[0].webformatURL;
        } else {
            data.imageUrl = '';
        }


        travelData.push(data);

        res.send({
            messsage: "add travel data successfully.",
            success: true
        });
    });





});

// Delete travle data
app.post('/delete', function (req, res) {
    let currentIndex = req.body.currentIndex;

    travelData.splice(currentIndex, 1);
    res.send({
        messsage: "delete travel data successfully.",
        success: true
    });
})

// DarkSky api
const darksky = async (latitude, longitude) => {


    const requestURL = darkSkyURL + darkSkyKEY + '/' + latitude + ',' + longitude;
    const response = await fetch(requestURL);
    let result = {};
    try {
        result = await response.json();

    } catch (error) {
        console.log('error:', error);
    };
    return result;
}
// Pixabay api
// demo https://pixabay.com/api/?key=14079111-7d17da301e5b35fd0f5e584c0&q=yellow+flowers&image_type=photo&pretty=true
const pixabay = async (location) => {
    const requestURL = pixabayURL + 'key=' + pixabayKEY + '&q=' + encodeURIComponent(location) + '&image_type=photo';
    const response = await fetch(requestURL);
    let result = {};
    try {

        result = await response.json();

    } catch (error) {
        console.log('error:', error);
    };
    return result;
}