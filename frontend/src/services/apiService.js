// src/services/apiService.js
import axios from 'axios';

// Function to fetch weather data
export const fetchWeatherData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/weather');
        console.log('Weather data fetched:', response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// Function to fetch alerts
export const fetchAlerts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/alerts');
        console.log('Alerts fetched:', response.data); // Log the response
        return response.data; // Return the alerts data
    } catch (error) {
        console.error('Error fetching alerts:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const calculateDailySummary = async (date) => {
    try {
        const response = await axios.post('http://localhost:5000/api/weatherSummary/calculateSummary', { date });
        return response.data; // Return the daily summary data for all cities
    } catch (error) {
        console.error('Error calculating daily summary:', error);
        throw error; // Throw the error to handle it in the component
    }
};
