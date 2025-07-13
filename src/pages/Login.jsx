import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      login(res.data);
      toast.success("Login successful!");
      navigate("/trips");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Wrong email or password.");
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login | TravelMate";
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Log In to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium hover:bg-blue-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                Forgot your password?
              </button>
            </div>
          </form>

          {/* Not a user yet? Register */}
          <div className="mt-4 text-center text-gray-700">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 underline hover:text-blue-800 font-medium"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
