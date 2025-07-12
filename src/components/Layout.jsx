import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-white">
      <Outlet />
    </div>
  );
};

export default Layout;