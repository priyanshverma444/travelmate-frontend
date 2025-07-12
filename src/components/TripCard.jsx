import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const TripCard = ({ trip, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [forecast, setForecast] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch 1-day forecast for the destination
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: API_KEY,
              q: trip.destination,
              days: 1,
            },
          }
        );
        setForecast(res.data.forecast.forecastday[0]);
      } catch (err) {
        console.error("Weather load error:", err.message);
      }
    };

    fetchWeather();
  }, [trip.destination]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this trip?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/trips/${trip._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Trip deleted successfully.");
      onDelete(); // refresh the list
    } catch (err) {
      toast.error("Failed to delete trip.");
      console.error(err);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-5 flex flex-col justify-between bg-gray-100">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-blue-700">{trip.destination}</h3>
        <p className="text-gray-600 text-md">
          {new Date(trip.startDate).toLocaleDateString()} –{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        {forecast && (
          <div className="flex items-center justify-center gap-2">
            <img
              src={forecast.day.condition.icon}
              alt={forecast.day.condition.text}
              className="w-7 h-7"
            />
            <span className="text-md text-gray-700">
              {Math.round(forecast.day.avgtemp_c)}°C, {forecast.day.condition.text}
            </span>
          </div>
        )}

        <p className="m-5 text-gray-800 text-xl font-bold">
          {trip.notes || "No notes added."}
        </p>
      </div>

      <div className="m-3 flex justify-around">
        <button
          onClick={() => navigate(`/trips/edit/${trip._id}`)}
          className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;