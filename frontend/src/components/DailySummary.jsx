// src/components/DailySummaryForm.jsx
import React, { useState } from 'react';
import { calculateDailySummary } from '../services/apiService';
import '../styles/daily.css'; // Importing the CSS file

const DailySummaryForm = () => {
    const [date, setDate] = useState('');
    const [summaries, setSummaries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSummaries([]);
        setLoading(true); // Set loading to true when submitting the form

        try {
            const data = await calculateDailySummary(date); // Fetch summaries for all cities
            setSummaries(data);
        } catch (err) {
            setError('Failed to calculate daily summary. Please try again.');
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    return (
        <div className="daily-summary-form">
            <h2 className="form-title">Daily Weather Summary</h2>
            <form onSubmit={handleSubmit} className="summary-form">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="date-input"
                />
                <button type="submit" className="calculate-button">Calculate Summary</button>
            </form>

            <div className="summary-results">
                {loading && <p className="loading-message">Loading...</p>} {/* Show loading message */}
                
                {!loading && summaries.length > 0 && summaries.map((summary, index) => (
                    <div key={index} className="summary-result">
                        {summary.message ? (
                            <p className="no-data-message">
                                No data available for {summary.city} on {new Date(date).toLocaleDateString()}.
                            </p>
                        ) : (
                            <>
                                <h3 className="city-summary-title">Summary for {summary.city} on {new Date(summary.date).toLocaleDateString()}</h3>
                                <p><strong>Average Temperature:</strong> {summary.avg_temp.toFixed(2)}°C</p>
                                <p><strong>Maximum Temperature:</strong> {summary.max_temp}°C</p>
                                <p><strong>Minimum Temperature:</strong> {summary.min_temp}°C</p>
                                <p><strong>Dominant Condition:</strong> {summary.dominant_condition}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DailySummaryForm;
