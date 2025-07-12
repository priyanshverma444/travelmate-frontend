import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
          Welcome to TravelMate ✈️
        </h1>
        <p className="text-gray-700 text-lg mb-8 font-bold">
          Plan smarter. Travel better. Track your trips and check live weather forecasts
          for your destinations — all in one place.
        </p>

        {user ? (
          <button
            onClick={() => navigate("/trips")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            View My Trips
          </button>
        ) : (
          <div className="space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded border border-blue-500"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;