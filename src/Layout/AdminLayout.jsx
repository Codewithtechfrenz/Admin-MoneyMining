import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
// import RecentActivity from "../Components/RecentActivity";
import "../Css/AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // start with sidebar closed on small screens
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // automatically close sidebar on window resize below breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* backdrop for mobile when sidebar is open */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

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
