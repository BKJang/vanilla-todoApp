const weather = document.querySelector('.js-weather');

const API_KEY = '1b2ce23068764a3009981ae3c7b8954c';
const COORDS = 'coords';

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't get geolocation.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if(!loadedCoords) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(localStorage.getItem(COORDS));
        const longitude = parseCoords.longitude;
        const latitude = parseCoords.latitude;
        getWeather(latitude, longitude)
    }
}

function init() {
    loadCoords();
}

init();