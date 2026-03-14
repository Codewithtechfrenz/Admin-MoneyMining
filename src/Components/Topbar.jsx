import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import logo from "../Images/Logo.png";
import "../Css/Topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <Menu
          size={22}
          className="hamburger"
          onClick={toggleSidebar}
        />
      </div>

      {/* Center logo */}
      <div className="topbar-center">
        <img src={logo} alt="Money Mining Logo" className="topbar-logo" />
      </div>

      {/* Right */}
      <div className="topbar-right">
        <div
          className="bell-wrapper"
          onClick={() => setOpen(!open)}
        >
          <Bell size={20} />
          <span className="bell-dot"></span>

          {open && (
            <div className="notification-popup">
              <p>No new notifications</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
