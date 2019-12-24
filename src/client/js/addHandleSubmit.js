const geonamesURL = 'http://api.geonames.org/citiesJSON?';
const userName = '&username=liminjun88';

apiURL = 'http://localhost:8090';

function addHandleSubmit(event) {
    let city = document.getElementById('city').value;
    let goDate = document.getElementById('date').value;

    let currentDate = new Date();

    let duration = (new Date(goDate).setHours(0, 0, 0) - currentDate.setHours(0, 0, 0)) / (1000 * 3600 * 24);

    getData(geonamesURL, city, userName)
        .then((response) => {
            //save data to server
            postData(apiURL + '/add', {
                location: data.geonames[0].name,
                latitude: data.geonames[0].lat,
                longitude: data.geonames[0].lng,
                countryName: data.geonames[0].countryName,
                duration: duration
            });
        })
        .then(() => {
            getTravelList(apiURL + '/all');
        });


}
const getData = async (url, city, userName) => {
    const response = await fetch(url + city + userName);
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
export default {
    addHandleSubmit
}