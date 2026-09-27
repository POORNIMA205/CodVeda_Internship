const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const errorMessage = document.getElementById("errorMessage");

// Search button
searchBtn.addEventListener("click", getWeather);

// Allow pressing Enter to search
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    // Check if city is empty
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    errorMessage.textContent = "";
    cityName.textContent = "Loading...";
    temperature.textContent = "Temperature: -- °C";
    condition.textContent = "Condition: --";
    humidity.textContent = "Humidity: -- %";
    windSpeed.textContent = "Wind Speed: -- km/h";

    try {
        // Step 1: Find the city's latitude and longitude
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find the city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please enter a valid city.");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Get weather information
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        // Step 3: Display the data
        cityName.textContent = `${location.name}, ${location.country}`;

        temperature.textContent =
            `Temperature: ${currentWeather.temperature_2m} °C`;

        humidity.textContent =
            `Humidity: ${currentWeather.relative_humidity_2m} %`;

        windSpeed.textContent =
            `Wind Speed: ${currentWeather.wind_speed_10m} km/h`;

        condition.textContent =
            `Condition: ${getWeatherCondition(currentWeather.weather_code)}`;

    } catch (error) {
        console.error(error);

        cityName.textContent = "Weather Dashboard";

        errorMessage.textContent = error.message;

        temperature.textContent = "Temperature: -- °C";
        condition.textContent = "Condition: --";
        humidity.textContent = "Humidity: -- %";
        windSpeed.textContent = "Wind Speed: -- km/h";
    }
}


// Convert weather code into readable condition
function getWeatherCondition(code) {

    if (code === 0) {
        return "Clear Sky ☀️";
    }

    if (code === 1 || code === 2 || code === 3) {
        return "Partly Cloudy ⛅";
    }

    if (code === 45 || code === 48) {
        return "Fog 🌫️";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle 🌦️";
    }

    if (code >= 61 && code <= 67) {
        return "Rain 🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "Snow ❄️";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers 🌧️";
    }

    if (code >= 95 && code <= 99) {
        return "Thunderstorm ⛈️";
    }

    return "Unknown";
}