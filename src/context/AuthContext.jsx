import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const logoutTimer = useRef(null);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    scheduleAutoLogout(userData.token);
  };

  // for auto logout
  const logout = (auto = false) => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    clearTimeout(logoutTimer.current);

    if (auto) {
      toast.info("Session expired. Please login again.");
    }
  };

  const scheduleAutoLogout = (token) => {
    try {
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      const timeLeft = expiresAt - Date.now();

      if (timeLeft <= 0) {
        logout(true); // token expired
      } else {
        clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => logout(true), timeLeft);
      }
    } catch (err) {
      logout(true); // invalid token
    }
  };

  useEffect(() => {
    if (token) {
      scheduleAutoLogout(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);