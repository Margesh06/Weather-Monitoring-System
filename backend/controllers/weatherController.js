const WeatherData = require('../models/WeatherData');
const DailySummary = require('../models/DailySummary');
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;

const fahrenheitToCelsius = (tempFahrenheit) => (tempFahrenheit - 32) * 5 / 9;

const fetchWeatherData = async (req, res) => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const savedWeatherData = []; // Array to hold all saved weather data

    for (const city of cities) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=445e4efed671b4d5cc79806425ccd492`);
            const { temp, feels_like } = response.data.main;
            const main = response.data.weather[0].main;
            const timestamp = new Date(response.data.dt * 1000);

            // Create a new instance of WeatherData
            const weatherData = new WeatherData({
                city,
                temp: fahrenheitToCelsius(temp), // Convert to Celsius
                feels_like: fahrenheitToCelsius(feels_like), // Convert to Celsius
                main,
                timestamp
            });

            // Save to MongoDB
            const savedData = await weatherData.save();
            savedWeatherData.push(savedData); // Store the saved data for the response
        } catch (error) {
            console.error(`Failed to fetch weather data for ${city}: ${error}`);
        }
    }
    
    // Return all saved weather data to the client
    return res.status(200).json(savedWeatherData);
};



module.exports = { fetchWeatherData };
