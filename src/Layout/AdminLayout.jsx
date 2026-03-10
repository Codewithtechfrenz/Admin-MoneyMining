import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
// import RecentActivity from "../Components/RecentActivity";
import "../Css/AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      <div className={`main-area ${sidebarOpen ? "" : "expanded"}`}>
        {/* Topbar on all pages */}
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="content-area">
          <Outlet />
          {/* {isDashboard && <RecentActivity />} */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
