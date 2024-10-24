const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
    city: String,
    temp: Number,
    feels_like: Number,
    main: String,
    timestamp: Date
});

module.exports = mongoose.model('WeatherData', WeatherDataSchema);
