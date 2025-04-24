import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) return; // Don't make request if the city is empty

    setLoading(true);
    setError(null); // Reset error state before each new request

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();

      // Handle API error response (e.g., city not found)
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null); // Clear any previous weather data
      } else {
        setWeather(data); // Set the weather data
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather App ☁️</h1>

      <input
        type="text"
        placeholder="Enter city name"
        className="input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button className="btn" onClick={getWeather} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {/* Show error message if any */}
      {error && <p className="error">{error}</p>}

      {/* Show weather data */}
      {weather && weather.main && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

export default App;
