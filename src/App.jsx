import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const API_KEY = "e2769e7d7d6c4057a2674410242007";
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div>
          <h2 className="text-xl font-semibold">{weather.location.name}</h2>
          <p>
            {weather.current.temp_c}°C, {weather.current.condition.text}
          </p>
          <img
            src={weather.current.condition.icon}
            alt="Weather icon"
            className="mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">5-Day Forecast:</h3>
          <div className="grid grid-cols-1 gap-4">
            {weather.forecast.forecastday.map((day, index) => (
              <div key={index} className="p-2 bg-white rounded shadow">
                <p>{day.date}</p>
                <p>{day.day.avgtemp_c}°C</p>
                <img
                  src={day.day.condition.icon}
                  alt="Forecast icon"
                  className="mx-auto"
                />
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
