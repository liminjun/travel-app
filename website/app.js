/* Global Variables */
const apiKey = "6059d75bceaa5c259158cf42c8669ebe";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//store input element
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const btnSubmit = document.getElementById("generate");

//store output element

const content = document.getElementById("content");
const date = document.getElementById("date");
const temp = document.getElementById("temp");

//get weather data function
const getWeather = async (apiURL, zipValue) => {
    const requestURL = apiURL + "zip=" + zipValue + "&appid=" + apiKey;
    const request = await fetch(requestURL);
    try {
        const result = await request.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
//post data function
const postData = async (url = "", data = {}) => {
    const requst = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });
    try {
        const result = await requst.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//update ui function
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const responseData = await request.json();
     
        date.innerHTML = responseData.date;
        temp.innerHTML = responseData.temp,
            content.innerHTML = responseData.content;
    } catch (error) {
        console.log(error);
    }
}
function generateData(event) {
    event.preventDefault();
    const zipValue = zip.value;
    const feelingsValue = feelings.value;

    getWeather(apiURL, zipValue)
        .then(function (weatherData) {
            postData('/addContent', {
                date: newDate,
                temp: weatherData.main.temp,
                content: feelingsValue
            });
        })
        .then(function (resultData) {
            updateUI();
        });
}

btnSubmit.addEventListener("click", generateData);