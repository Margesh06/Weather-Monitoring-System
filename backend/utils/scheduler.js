const cron = require('node-cron');
const { fetchWeatherData } = require('../controllers/weatherController');
const { checkAlertThreshold } = require('../controllers/alertController');

cron.schedule('*/30 * * * * *', async () => {
    console.log("Fetching weather data...");
    await fetchWeatherData();
    await checkAlertThreshold();
});
