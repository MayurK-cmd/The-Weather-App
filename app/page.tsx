"use client";
// import '../app/globals.css';

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      
      const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
      const response = await fetch(url);
      const data = await response.json();

      // Check if the data is valid and contains the location and current weather
      if (data && data.location && data.current) {
        setWeather(data);
      } else {
        setError('Weather data not available. Please try again.');
        setWeather(null); 
      }
    } catch (error) {
      setError('Failed to fetch weather data.');
      setWeather(null); 
    }
  };

  return (
    
      <div>
        <h1>The Weather App</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get weather</button>
        </div>
  
        {error && <p className="error">{error}</p>}
  
        {weather && weather.location && weather.current && (
          <div className="weather-card">
            <h2>Weather in {weather.location.name}</h2>
            <p>Local Time: {weather.location.localtime}</p>
            <p>{weather.current.temperature}°C</p>
            <p>{weather.current.weather_descriptions[0]}</p>

            <p>Wind Speed: {weather.current.wind_speed} km/h</p>
          <p>Wind Direction: {weather.current.wind_dir}</p>
          <p>Wind Degree: {weather.current.wind_degree}°</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Visibility: {weather.current.visibility} km</p>
          
          <p>Timezone: {weather.location.timezone_id}</p>
          </div>
        )}
      </div>
    );
}
