# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that retrieves weather data from the OpenWeatherMap API and provides summarized insights using rollups and aggregates. The system continuously monitors weather conditions for major metros in India and triggers alerts based on configurable thresholds.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [API Structure](#api-structure)
5. [Data Processing and Analysis](#data-processing-and-analysis)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [Future Enhancements](#future-enhancements)

## Features
- **Real-Time Weather Data Retrieval**: Continuously fetches weather data from the OpenWeatherMap API for metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- **Weather Data Aggregation**:
  - Daily weather summary including average, maximum, minimum temperature, and dominant weather condition.
- **Alerting System**:
  - Triggers alerts based on configurable thresholds for temperature and weather conditions.
  - Alerts can be displayed on the Website or sent via email.
- **Visualizations**:
  - Displays daily weather summaries and triggered alerts.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: [OpenWeatherMap API](https://openweathermap.org/)

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Create a `.env` file in the `server` directory** and add the following environment variables:
   ```
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

5. **Start the Backend Server**
   ```bash
   cd backend
   node app.js
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```

## API Structure

The project follows a REST API structure for handling weather data, alerts, and weather summaries.

- **Weather Data Routes (`/api/weather`)**:
  - `GET /api/weather`: Fetches the latest weather data from the OpenWeatherMap API every 5 minutes for the configured metros.
  - `POST /api/weather`: Stores weather data in MongoDB.

- **Alert Routes (`/api/alerts`)**:
  - `GET /api/alerts`: Retrieves triggered alerts.
  - `POST /api/alerts`: Trigger an alert based on a specified condition.

- **Weather Summary Routes (`/api/weatherSummary`)**:
  - `GET /api/weatherSummary`: Retrieves the daily weather summary.
  - `POST /api/weatherSummary`: Generates a new daily summary.

## Data Processing and Analysis

1. **Temperature Conversion**:
   - Weather data retrieved from the API is in fahrenheit and is converted to Celsius for display and analysis.

2. **Daily Weather Summary**:
   - Aggregates weather data for each day to calculate:
     - Average temperature
     - Maximum temperature
     - Minimum temperature
     - Dominant weather condition (the most frequent condition throughout the day)

3. **Alerting Thresholds**:
   - User-configurable thresholds for temperature and weather conditions.
   - Alerts are triggered if the temperature exceeds the threshold for two consecutive updates.

## Configuration

- **Weather Update Interval**: The system can be configured to fetch weather data at specific intervals (e.g., every 5 minutes).
- **Alert Thresholds**: Configure alert thresholds in the `.env` file or a configuration file for dynamic changes.

## Usage

1. **Start the Servers**:
   - Make sure both the backend and frontend servers are running.
2. **Access the Web Interface**:
   - Open a browser and navigate to `http://localhost:3000` (or the port your frontend server is running on).

## Future Enhancements
- Implement email and SMS notification for alerts.
- Add support for more cities and regions.
- Implement user authentication for personalized settings.
- Integrate additional data sources for more comprehensive weather analysis.

## Snapshots

![image](https://github.com/user-attachments/assets/91ae57d8-5ea7-4f2b-9b90-b29de8000afd)

![image](https://github.com/user-attachments/assets/a251d139-76c1-4232-807f-ac4a62f6fdee)


