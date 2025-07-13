import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(false); // manual logout
    toast.success("Logged out successfully.");
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue/80 backdrop-blur-md border-b border-blue-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
          onClick={closeMenu}
        >
          TravelMate
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
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
              className="text-red-600 underline hover:text-red-700 font-semibold transition text-sm"
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

        {/* Hamburger Toggle Button */}
        <button
          className="lg:hidden text-blue-700 focus:outline-none transition-transform duration-300 ease-in-out"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with smooth transition */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } px-4 flex flex-col gap-3 bg-blue/80 backdrop-blur-md`}
      >
        {user && (
          <>
            <Link
              to="/trips"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-600 font-medium py-1"
            >
              My Trips
            </Link>
            <Link
              to="/trips/new"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-600 font-medium py-1"
            >
              Plan Trip
            </Link>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-600 underline hover:text-red-700 font-semibold text-left py-1"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-blue-600 hover:underline font-medium py-1"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="text-blue-600 hover:underline font-medium py-1"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;