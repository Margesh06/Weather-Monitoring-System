// src/App.jsx
import React from 'react';
import WeatherSummary from './components/WeatherSummary';
import HistoricalTrends from './components/HistoricalTrends';
import Alerts from './components/Alerts';
import DailySummary from './components/DailySummary';
import './styles.css';

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Weather Monitoring System</h1>
            </header>
            <main className="app-content">
                <section className="weather-section">
                    <WeatherSummary />
                </section>
                <section className="alerts-section">
                    <Alerts />
                </section>
                <section className="daily-summary-section">
                    <DailySummary />
                </section>
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 Weather Monitoring System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
