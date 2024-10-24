
// src/components/Alerts.jsx
import React, { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/apiService';
import '../styles/alert.css'; // Import the CSS file for styling

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator

    const getAlerts = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const data = await fetchAlerts(); // Fetch alerts from the API
            setAlerts(data); // Update state with fetched alerts
        } catch (error) {
            console.error('Failed to fetch alerts:', error); // Log error if fetching fails
        }
        setLoading(false); // Set loading to false after fetching
    };

    useEffect(() => {
        // Fetch alerts immediately on mount
        getAlerts();

        const intervalId = setInterval(getAlerts, 300000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="alerts-container">
            <h2 className="alerts-title">Weather Alerts</h2>
            {loading ? (
                <div className="loading">Loading...</div> // Display loading message while fetching
            ) : alerts.length > 0 ? (
                <div className="alerts-list">
                    {alerts.map((alert) => (
                        <div className="alert-card" key={alert._id}>
                            <div className="alert-header">
                                <strong className="alert-type">{alert.alert_type}</strong>
                                <span className="alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="alert-body">
                                <p className="alert-message">{alert.message}</p>
                                <p className="alert-city"><strong>City:</strong> {alert.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-alerts">No alerts at this time.</p>
            )}
        </div>
    );
};

export default Alerts;
