import { createContext, useContext, useState } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherCache, setWeatherCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CACHE_TTL_SECONDS = 3600; // 1 hour cache TTL

  const getForecast = async (city) => {
    if (!city) return null;

    const cached = weatherCache[city];

    if (cached) {
      const age = (Date.now() - cached.timestamp) / 1000;
      if (age < CACHE_TTL_SECONDS) {
        return cached.data; // Return from cache if not expired
      }
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: API_KEY,
          q: city,
          days: 7,
        },
      });

      const forecast = res.data.forecast.forecastday;

      setWeatherCache((prev) => ({
        ...prev,
        [city]: {
          data: forecast,
          timestamp: Date.now(),
        },
      }));

      return forecast;
    } catch (err) {
      console.error("Weather API error:", err);
      setError("Failed to fetch weather.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ getForecast, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);