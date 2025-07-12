import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TripCard from "../components/TripCard";

const TripList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/trips`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
      return;
    }

    fetchTrips();
  }, [user]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">My Trips</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading trips...</p>
        ) : trips.length === 0 ? (
          <p className="text-center text-gray-600">No trips found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onDelete={fetchTrips} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripList;