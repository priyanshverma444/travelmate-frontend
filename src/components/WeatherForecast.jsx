import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useWeather } from "../context/WeatherContext";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [debouncedCity, setDebouncedCity] = useState(city);

  const { getForecast, loading, error } = useWeather();

  // Debounce input city
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);
    return () => clearTimeout(handler);
  }, [city]);

  // Fetch from WeatherContext
  useEffect(() => {
    const fetchForecast = async () => {
      if (!debouncedCity) return;
      const data = await getForecast(debouncedCity);
      if (data) setForecast(data);
    };

    fetchForecast();
  }, [debouncedCity, getForecast]);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        7-Day Forecast
      </h3>

      {!debouncedCity || loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {Array(7).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-blue-100 p-4 rounded shadow animate-pulse h-40"
            ></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="bg-blue-100 border border-blue-200 shadow-sm rounded-lg p-4 text-center"
            >
              <p className="font-semibold mb-1 text-blue-700">
                {dayjs(day.date).format("ddd")}
              </p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="mx-auto w-12 h-12"
              />
              <p className="text-lg font-bold text-gray-700">
                {Math.round(day.day.avgtemp_c)}°C
              </p>
              <p className="text-xs text-gray-600 mt-1">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;