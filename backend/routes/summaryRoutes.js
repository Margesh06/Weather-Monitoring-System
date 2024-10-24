// backend/routes/weatherSummaryRoutes.js
const express = require('express');
const router = express.Router();
const { calculateDailySummary } = require('../controllers/summaryController');

// Define the route for calculating the daily summary
router.post('/calculateSummary', async (req, res) => {
    const { date } = req.body; // Extract date from the request body

    try {
        // Call the function to calculate daily summary
        const summaries = await calculateDailySummary(date);
        
        // Return the response with the status 200 and the summaries data
        return res.status(200).json(summaries);
    } catch (error) {
        console.error('Error in /calculateSummary:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Handle errors gracefully
    }
});

module.exports = router;
