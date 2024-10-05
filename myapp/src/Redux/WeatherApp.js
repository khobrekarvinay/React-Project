// WeatherApp.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, setCity, toggleTempUnit } from './Weatherslice'; // Import actions
import './WeatherApp.css'; // Create this CSS file for styling

function WeatherApp() {
  const dispatch = useDispatch();
  const { city, weather, current, location, forecast, loading, error, tempUnit } = useSelector(
    (state) => state.weather
  );

  // Handle city input change
  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
  };

  // Handle search button click
  const handleSearch = () => {
    dispatch(fetchWeather(city)); // Dispatch the async fetchWeather action
  };

  // Toggle temperature unit between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    dispatch(toggleTempUnit());
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      {/* Input section */}
      <div className="weather-app-input">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading state */}
      {loading && <p className="loader">Fetching weather data...</p>}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display weather data */}
      {weather && current && location && forecast && !error ? (
        <>
          <h1>{location.country}</h1>
          <h2>{location.name}</h2>

          <div className="current-weather">
            <p>
              Temperature: {tempUnit === 'C' ? current.temp_c : current.temp_f}°
              {tempUnit}
            </p>
            <p>
              Feels like: {tempUnit === 'C' ? current.feelslike_c : current.feelslike_f}°
              {tempUnit}
            </p>
            <p>
              Max Temp: {tempUnit === 'C'
                ? forecast.forecastday[0].day.maxtemp_c
                : forecast.forecastday[0].day.maxtemp_f}°
              {tempUnit}
            </p>
            <p>Humidity: {current.humidity}%</p>
            <div className="weather-condition">
              <img src={current.condition.icon} alt={current.condition.text} />
              <p>{current.condition.text}</p>
            </div>
          </div>

          {/* Toggle Temperature Unit */}
          <button onClick={toggleTemperatureUnit}>
            Switch to {tempUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>

          {/* Forecast */}
          <h2>Hourly Forecast</h2>
          <div className="forecast-of-day">
            {forecast.forecastday[0].hour.map((fore, index) => (
              <div key={index} className="forecast-container">
                <div className="time">
                  <p>Time: {fore.time.slice(11)}</p>
                </div>
                <div className="temp">
                  <p>
                    Temp: {tempUnit === 'C' ? fore.temp_c : fore.temp_f}°
                    {tempUnit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        !loading && <p className="displayer">Enter a city to get the weather details!</p>
      )}
    </div>
  );
}

export default WeatherApp;
