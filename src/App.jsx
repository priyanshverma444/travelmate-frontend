import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TripList from "./pages/TripList";
import TripForm from "./pages/TripForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/new" element={<TripForm />} />
        <Route path="/trips/edit/:id" element={<TripForm />} />
      </Routes>
    </Router>
  );
}

export default App;
