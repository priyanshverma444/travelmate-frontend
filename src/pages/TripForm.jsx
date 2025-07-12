import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import WeatherForecast from "../components/WeatherForeCast";

const TripForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // if editing: id exists

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Load trip data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchTrip = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/trips`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const existingTrip = res.data.find((trip) => trip._id === id);
          if (!existingTrip) {
            toast.error("Trip not found");
            navigate("/trips");
            return;
          }

          setFormData({
            destination: existingTrip.destination,
            startDate: existingTrip.startDate.slice(0, 10),
            endDate: existingTrip.endDate.slice(0, 10),
            notes: existingTrip.notes || "",
          });
        } catch (err) {
          toast.error("Error loading trip");
          navigate("/trips");
        }
      };

      fetchTrip();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { destination, startDate, endDate } = formData;
    if (!destination || !startDate || !endDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/trips/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Trip updated!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/trips`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Trip created!");
      }

      navigate("/trips");
    } catch (err) {
      toast.error("Failed to save trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Left: Trip Form */}
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {isEditing ? "Edit Trip" : "Plan a New Trip"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
            </div>

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Trip"
                : "Create Trip"}
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
          <WeatherForecast city={formData.destination} />
        </div>
      </div>
    </div>
  );
};

export default TripForm;
