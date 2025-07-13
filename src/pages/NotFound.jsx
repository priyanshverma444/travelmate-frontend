import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found | TravelMate";
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <FaRocket className="text-blue-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-5xl font-bold text-blue-600 mb-2">
          404 - Not Found
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you are looking for might be in another galaxy.
        </p>
        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
