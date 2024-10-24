// src/components/Alerts.jsx
import React, { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/apiService';
import '../styles/alert.css'; // Import the CSS file for styling

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0); // Current index of the alert being displayed

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

    useEffect(() => {
        // Set an interval to change alerts every 15 seconds
        const alertInterval = setInterval(() => {
            setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length); // Loop through alerts
        }, 2000); // Change alert every 15 seconds

        return () => clearInterval(alertInterval); // Clear interval on unmount
    }, [alerts]);

    return (
        <div className="alerts-container">
            {loading ? (
                <div className="loading">Loading...</div> // Display loading message while fetching
            ) : alerts.length > 0 ? (
                <div className="alert-card" key={alerts[currentAlertIndex]._id}>
                    <div className="alert-header">
                        <strong className="alert-type">{alerts[currentAlertIndex].alert_type}</strong>
                        <span className="alert-timestamp">{new Date(alerts[currentAlertIndex].timestamp).toLocaleString()}</span>
                    </div>
                    <div className="alert-body">
                        <p className="alert-message">{alerts[currentAlertIndex].message}</p>
                        <p className="alert-city"><strong>City:</strong> {alerts[currentAlertIndex].city}</p>
                    </div>
                </div>
            ) : (
                <p className="no-alerts">No alerts at this time.</p>
            )}
        </div>
    );
};

export default Alerts;
