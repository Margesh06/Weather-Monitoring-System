// backend/models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    alert_type: { type: String, required: true },
    message: { type: String, required: true },
    city: { type: String, required: true }, // Add city field
    timestamp: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
