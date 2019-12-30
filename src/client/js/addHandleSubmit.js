const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const userName = '&username=liminjun88';

const apiURL = 'http://localhost:8090';

const allData = [
    {
        "location": "Suzhou",
        "countryName": "China",
        "latitude": "31.30408",
        "longitude": "120.59538",
        "duration": 0.9999894560185185,
        "dailySummary": "Clear throughout the day.",
        "temperatureMin": 34.19,
        "temperatureMax": 53.42,
        "imageUrl": "https://pixabay.com/get/54e4d64a4d50a514f6da8c7dda79367a1538d7e452506c4870287cd1954ccc5bb1_640.jpg"
    },
    {
        "location": "Suzhou",
        "countryName": "China",
        "latitude": "31.30408",
        "longitude": "120.59538",
        "duration": 1.9999911342592593,
        "dailySummary": "Clear throughout the day.",
        "temperatureMin": 34.19,
        "temperatureMax": 53.42,
        "imageUrl": "https://pixabay.com/get/54e4d64a4d50a514f6da8c7dda79367a1538d7e452506c4870287cd1954ccc5bb1_640.jpg"
    },
    {
        "location": "Suzhou",
        "countryName": "China",
        "latitude": "31.30408",
        "longitude": "120.59538",
        "duration": 2.9999910879629628,
        "dailySummary": "Clear throughout the day.",
        "temperatureMin": 34.19,
        "temperatureMax": 53.48,
        "imageUrl": "https://pixabay.com/get/54e4d64a4d50a514f6da8c7dda79367a1538d7e452506c4870287cd1954ccc5bb1_640.jpg"
    }
];


function getList() {
    getTravelList(apiURL + '/list')
        .then((allData) => {
            generateContent(allData);
        });
}

function addHandleSubmit(event) {
    event.preventDefault();
    let city = document.getElementById('city').value;
    let goDate = document.getElementById('date').value;

    if (city == '' || goDate == '') {
        alert("Location or Departing date is empty.");
        return;
    }

 
    let duration = new Date(goDate).getDay()-(new Date()).getDay();
 

    getData(geonamesURL, city, userName)
        .then((data) => {
            //save data to server
            postData(apiURL + '/add', {
                location: data.geonames[0].name,
                latitude: data.geonames[0].lat,
                longitude: data.geonames[0].lng,
                countryName: data.geonames[0].countryName,
                goDate: goDate,
                duration: duration
            }).then(() => {
                getTravelList(apiURL + '/list')
                    .then((allData) => {
                        generateContent(allData);
                    });
            });
        })



}
function generateContent(allData) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    let resultTemplate = '';
    for (let i = 0; i < allData.length; i++) {
        let template = `
        <div class="destination">
    <div class="left-side">
        <img width="320" height="320"
            src=${allData[i].imageUrl == '' ? Client.previewImage : allData[i].imageUrl}>
    </div>
    <div class="right-side">
        <h3>My trip to:
            <span>${allData[i].location},${allData[i].countryName}</span>
        </h3>
        <h3>
            Departing:${allData[i].goDate}
        </h3>
        <div>${allData[i].duration}days away.</div>
        <div class="weather-panel">
            <h4>Typical weather for then is:</h4>
            <p>High- <span>${allData[i].temperatureMax}</span>, Low - <span>${allData[i].temperatureMin}</span></p>
            <p>${allData[i].dailySummary}</p>
        </div>
        <div>
            <a onclick="return Client.deleteHandleSubmit(event);" class="btn-remove" href="javascript:void(0)"
                data-index=${i}>Remove trip</a>
        </div>
    </div>
</div>
        `;

        resultTemplate += template;
    }
    resultContainer.innerHTML = resultTemplate;
}
const getTravelList = async (requestUrl) => {
    const response = await fetch(requestUrl);
    try {
        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.log('error', error);
    }
}
const getData = async (url, city, userName) => {
    const response = await fetch(url + city + userName + '&maxRows=1');
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
module.exports = {
    addHandleSubmit,
    getList
};