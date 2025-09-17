const axios = require('axios');
require('dotenv').config();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getWeather(city) {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: process.env.API_KEY,
            units: 'imperial'
        }
    })
    .then(response => {
        console.log(`Weather in ${city}: ${response.data.weather[0].description}`);
        console.log(`Temperature: ${response.data.main.temp}˚F`);
    })
    .catch(error => {
        console.error('Error fetching weather: ', error.response?.data?.message || error.message);
    });
}

function askCity() {
    rl.question("Enter a city name (or 'exit' to quit): ", (answer) => {
        if (answer.toLowerCase() === 'exit') {
            rl.close();
            return;
        }
        getWeather(answer);
        // Wait a bit and ask again
        setTimeout(askCity, 1500);
    });
}

askCity();