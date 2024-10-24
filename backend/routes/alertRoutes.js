// backend/routes/alertRoutes.js
const express = require('express');
const { getAlerts, checkAlertThreshold } = require('../controllers/alertController');

const router = express.Router();

// Route to fetch all alerts
router.get('/', getAlerts);

// Route to check alert thresholds (if needed)
router.post('/check', checkAlertThreshold); // Use POST for checking alerts

module.exports = router;
