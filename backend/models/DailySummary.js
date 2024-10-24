const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    city: { type: String, required: true },
    avg_temp: { type: Number, required: true },
    max_temp: { type: Number, required: true },
    min_temp: { type: Number, required: true },
    dominant_condition: { type: String, required: true }
});

// Add a unique compound index for date and city
dailySummarySchema.index({ date: 1, city: 1 }, { unique: true });

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = DailySummary;
