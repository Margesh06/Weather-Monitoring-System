const express = require('express');
const { fetchWeatherData } = require('../controllers/weatherController');

const router = express.Router();

router.get('/', fetchWeatherData);

module.exports = router;
