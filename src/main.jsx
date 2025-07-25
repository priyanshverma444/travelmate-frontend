import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WeatherProvider } from "./context/WeatherContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <WeatherProvider>
        <App />
        <ToastContainer position="top-center" autoClose={3000} />
      </WeatherProvider>
    </AuthProvider>
  </StrictMode>,
)
