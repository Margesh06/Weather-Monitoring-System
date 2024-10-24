// backend/controllers/alertController.js
const Alert = require('../models/Alert');
const WeatherData = require('../models/WeatherData');

// Function to create alerts based on weather conditions
const checkAlertThreshold = async () => {
    const thresholdTemp = 20; // Set your temperature threshold
    const recentData = await WeatherData.find().sort({ timestamp: -1 }).limit(2); // Get the latest two records

    console.log("Recent Weather Data:", recentData);

    if (recentData.length >= 2 && recentData[0].temp > thresholdTemp && recentData[1].temp > thresholdTemp) {
        const alert = new Alert({
            alert_type: 'Temperature',
            message: `Temperature exceeded ${thresholdTemp}°C for two consecutive updates.`,
            city: recentData[0].city,
            timestamp: new Date()
        });

        await alert.save(); // Save the alert to the database
        console.log("Alert triggered: ", alert.message);
        
        // Return the created alert
        return alert; 
    }
    
    // Return a message indicating no alert was triggered
    return { message: 'No alerts triggered.' };
};

// Function to get all alerts
const getAlerts = async (req, res) => {
    try {
        await checkAlertThreshold();
        const alerts = await Alert.find().sort({ timestamp: -1 }); // Get alerts sorted by timestamp
        return res.status(200).json(alerts); // Return alerts as a JSON response
    } catch (error) {
        console.error('Error fetching alerts:', error);
        return res.status(500).json({ message: 'Failed to fetch alerts' });
    }
};

module.exports = { checkAlertThreshold, getAlerts };
