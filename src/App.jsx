import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TripList from "./pages/TripList";
import TripForm from "./pages/TripForm";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
