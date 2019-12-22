const dotenv = require('dotenv');
dotenv.config();

//default API key and url.
const darkSkyKEY = process.env.darkSkyKEY;
const darkSkyURL = 'https://api.darksky.net/forecast/';

const pixabayKEY = process.env.pixabayKEY;
const pixabayURL = 'https://pixabay.com/api/?';

const geonamesURL = 'http://api.geonames.org/citiesJSON?';



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
const data = {};
//Add travel data.
app.post('/add', function (req, res) {
    const requestBody = req.body;
    data.location = requestBody.location;
    data.country = requestBody.country;
    data.latitude = requestBody.latitude;
    data.longitude = requestBody.longitude;
    data.duration = requestBody.duration;
    data.weather = requestBody.weather;

    travelData.push(data);
    res.end();
    res.send({
        messsage: "add travel data successfully.",
        success: true
    });
});

// Delete travle data
app.post('/delete',function(req,res){
    let currentIndex=req.currentIndex;

    travelData.splice(currentIndex,1);
    res.send({
        messsage:"delete travel data successfully.",
        success:true
    });
})

// DarkSky api
app.get('/darksky', function (req, res) {
    let latitude = req.latitude + ',';
    let longitude = req.longitude + ',';
    let weather = req.weather;

    const requestURL = darkSkyURL + darkSkyAPI + longitude + latitude + weather;
    const response = fetch(requestURL);
    try {
        const result = resposne.json();
        res.send(result);
    } catch (error) {
        console.log('error:', error);
    };
});
// Pixabay api
// demo https://pixabay.com/api/?key=14079111-7d17da301e5b35fd0f5e584c0&q=yellow+flowers&image_type=photo&pretty=true
app.get('/pixabay', function (req, res) {
    let location = req.location;

    const requestURL = pixabayURL + 'key=' + pixabayKEY + '&q=' + encodeURIComponent(location) + '&image_type=photo';
    const response = fetch(requestURL);
    try {
        const result = resposne.json();
        res.send(result);
    } catch (error) {
        console.log('error:', error);
    };
});