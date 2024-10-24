// src/components/Weather.jsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/apiService'; // Adjust the path as needed
import '../styles/weather.css'; // Import the CSS file

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]); // Initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeatherData = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const data = await fetchWeatherData(); // Call the service function
            setWeatherData(data); // Set the fetched data
            setLoading(false); // Set loading to false after fetching
        } catch (err) {
            setError('Error fetching weather data');
            setLoading(false); // Set loading to false in case of error
        }
    };

    useEffect(() => {
        // Fetch weather data immediately on mount
        getWeatherData();

        const intervalId = setInterval(getWeatherData, 300000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="weather-container">
            <h1>Weather Data</h1>
            <ul>
                {weatherData.map((data) => ( // .map() will be called on an array
                    <li key={data._id} className="weather-item">
                        <h2 className="weather-title">{data.city}</h2>
                        <p className="weather-detail">Temperature: {data.temp.toFixed(2)} °C</p>
                        <p className="weather-detail">Feels Like: {data.feels_like.toFixed(2)} °C</p>
                        <p className="weather-detail">Condition: {data.main}</p>
                        <p className="weather-detail">Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Weather;
