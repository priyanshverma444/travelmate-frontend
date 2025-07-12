import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;