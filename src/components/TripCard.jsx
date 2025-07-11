import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const TripCard = ({ trip, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-blue-700">{trip.destination}</h3>
        <p className="text-gray-600 text-sm">
          {new Date(trip.startDate).toLocaleDateString()} –{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
        <p className="mt-2 text-gray-800">{trip.notes || "No notes added."}</p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => navigate(`/trips/edit/${trip._id}`)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;