import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debouncedCity, setDebouncedCity] = useState(city);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Debounce input city
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);

    return () => clearTimeout(handler);
  }, [city]);

  // Fetch weather based on debouncedCity
  useEffect(() => {
    const fetchForecast = async () => {
      if (!debouncedCity) return;

      try {
        setError("");
        setLoading(true);

        const res = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: API_KEY,
              q: debouncedCity,
              days: 7,
            },
          }
        );

        setForecast(res.data.forecast.forecastday);
      } catch (err) {
        setError("Failed to load weather.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [debouncedCity]);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        7-Day Forecast
      </h3>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-2">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-blue-100 p-5 rounded shadow animate-pulse h-40"
              ></div>
            ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="bg-blue-100 p-3 rounded shadow text-center"
            >
              <p className="font-medium">{dayjs(day.date).format("ddd")}</p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="mx-auto"
              />
              <p className="text-sm">{Math.round(day.day.avgtemp_c)}°C</p>
              <p className="text-xs text-gray-600">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
