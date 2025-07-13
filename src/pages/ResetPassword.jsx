import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation checks
  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const renderCheck = (label, condition) => (
    <li
      className={`text-sm flex items-center gap-2 ${
        condition ? "text-green-600" : "text-red-500"
      }`}
    >
      {condition ? "✔️" : "❌"} {label}
    </li>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordValid) {
      toast.error("Please fix password requirements.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/reset-password`, {
        email,
        token,
        newPassword,
      });

      toast.success("Password reset successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Reset failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or missing token.");
      navigate("/login");
    }
    document.title = "Reset Password | TravelMate";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 text-center p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Set a new password for <span className="font-medium">{email}</span>
        </p>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setTouched(true);
            }}
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

        {/* Password Strength */}
        {touched && !isPasswordValid && (
          <ul className="text-left mt-3 ml-1 space-y-1">
            {renderCheck("Minimum 8 characters", passwordChecks.length)}
            {renderCheck("At least 1 uppercase letter", passwordChecks.uppercase)}
            {renderCheck("At least 1 lowercase letter", passwordChecks.lowercase)}
            {renderCheck("At least 1 number", passwordChecks.number)}
            {renderCheck("At least 1 special character (!@#$%^&*)", passwordChecks.special)}
          </ul>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-2 text-white font-semibold rounded ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;