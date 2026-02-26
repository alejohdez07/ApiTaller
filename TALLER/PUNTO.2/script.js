const inputBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const errorMenssage =  document.querySelector('.error');

async function checkWeather(city){
    try {
    const apiKey = 'a056fb31533de7f96f98e3824f38c3cf';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response =  await fetch(apiUrl);

    if(!response.ok){
        throw new Error('Ciudad no encontrada');
    }

    const data = await response.json();

    console.log(data);
    updateWeatherUI(data);

    }catch (error) {
        console.error(error.message);
        weather.style.display = 'none';
        errorMenssage.style.display = 'block'
    }
    
}

function updateWeatherUI(data){
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`;

    const weatherCondition = data.weather[0].main;

    if (weatherCondition === "Clear") {
        document.body.style.background = "#f7b733"; // Soleado
    }
    else if (weatherCondition === "Rain") {
        document.body.style.background = "#4e73df"; // Lluvia
    }
    else if (weatherCondition === "Clouds") {
        document.body.style.background = "#757f9a"; // Nublado
    }
    else if (weatherCondition === "Snow") {
        document.body.style.background = "#e6e9f0"; // Nieve
    }
    else {
        document.body.style.background = "#222"; // Default
    }

    const backgroundColors = {
        Clear: "#f7b733",
        Rain: "#4e73df",
        Clouds: "#757f9a",
        Snow: "#e6e9f0"
    };

document.body.style.background = backgroundColors[data.weather[0].main] || "#222";

    const weatherIcons = {
        Clear: 'images/clear.png',
        Snow: 'images/snow.png',
        Rain: 'images/rain.png',
        Clouds: 'images/clouds.png'
    }

    weatherIcon.src = weatherIcons[data.weather[0].main] || 'images/rain.png';

    weather.style.display = 'block'
    errorMenssage.style.display = 'none'
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})

window.onload = () => {
    checkWeather('Medellin')
}