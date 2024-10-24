const WeatherData = require('../models/WeatherData');
const DailySummary = require('../models/DailySummary');
const moment = require('moment'); // Import moment for date handling

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const calculateDailySummary = async (date) => {
    try {
        const parsedDate = moment(date);
        if (!parsedDate.isValid()) {
            throw new Error('Invalid date format');
        }

        const startOfDay = parsedDate.startOf('day').toDate();
        const endOfDay = parsedDate.endOf('day').toDate();

        const summaries = [];

        for (const city of cities) {
            // Check if an entry for the same date and city already exists
            const existingSummary = await DailySummary.findOne({ 
                date: startOfDay, 
                city 
            });

            // If an entry exists, skip processing for this city
            if (existingSummary) {
                summaries.push({
                    city,
                    date: startOfDay,
                    message: 'Summary already exists.',
                    status: 'Skipped'
                });
                continue;
            }

            // Fetch weather data for the day
            const weatherData = await WeatherData.find({
                timestamp: { $gte: startOfDay, $lte: endOfDay },
                city: city
            });

            if (weatherData.length === 0) {
                summaries.push({ city, message: 'No data available for this date.' });
                continue;
            }

            const totalTemp = weatherData.reduce((acc, record) => acc + record.temp, 0);
            const avgTemp = totalTemp / weatherData.length;
            const maxTemp = Math.max(...weatherData.map(record => record.temp));
            const minTemp = Math.min(...weatherData.map(record => record.temp));

            const conditionFrequency = {};
            weatherData.forEach(record => {
                const condition = record.main;
                conditionFrequency[condition] = (conditionFrequency[condition] || 0) + 1;
            });
            const dominantCondition = Object.keys(conditionFrequency).reduce((a, b) =>
                conditionFrequency[a] > conditionFrequency[b] ? a : b
            );

            summaries.push({
                city,
                date: startOfDay,
                avg_temp: avgTemp,
                max_temp: maxTemp,
                min_temp: minTemp,
                dominant_condition: dominantCondition,
                status: 'Success'
            });
        }

        return summaries;
    } catch (error) {
        console.error('Error calculating daily summary:', error);
        throw error;
    }
};

module.exports = { calculateDailySummary };
