import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const { password } = formData;

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "password") setTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordValid) {
      toast.error("Please fix password requirements.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      login(res.data);
      toast.success("Registration successful!");
      navigate("/trips");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("User already exists. Please log in.");
      } else {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderCheck = (label, condition) => (
    <li
      className={`text-sm flex items-center gap-2 ${
        condition ? "text-green-600" : "text-red-500"
      }`}
    >
      {condition ? "✔️" : "❌"} {label}
    </li>
  );

  useEffect(() => {
    document.title = "Register | TravelMate";
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Password Field + Toggle */}
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

            {/* Password Rules */}
            {touched && !isPasswordValid && (
              <ul className="ml-2 mt-1 space-y-1">
                {renderCheck("Minimum 8 characters", passwordChecks.length)}
                {renderCheck(
                  "At least 1 uppercase letter",
                  passwordChecks.uppercase
                )}
                {renderCheck(
                  "At least 1 lowercase letter",
                  passwordChecks.lowercase
                )}
                {renderCheck("At least 1 number", passwordChecks.number)}
                {renderCheck(
                  "At least 1 special character (!@#$%^&*)",
                  passwordChecks.special
                )}
              </ul>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already a user? Log in */}
          <div className="mt-4 text-center text-gray-700">
            Already a user?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 underline hover:text-blue-800 font-medium"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
