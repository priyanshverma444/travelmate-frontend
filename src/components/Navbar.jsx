import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully.");
    navigate("/login");
  };

  return (
    <nav className="bg-blue/80 backdrop-blur-md border-b border-blue-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TravelMate
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link
                to="/trips"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                My Trips
              </Link>
              <Link
                to="/trips/new"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Plan Trip
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;