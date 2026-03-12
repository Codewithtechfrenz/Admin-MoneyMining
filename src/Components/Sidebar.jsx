import {
  LayoutDashboard,
  Users,
  MessageSquare,
  CheckCircle,
  FileText,
  LogOut,
  User,
  BarChart3,
  ClipboardList,
  Building2,        // Bank Approvals
  Wallet,           // Daily Wallet
  HandCoins,        // Referral Profit
  ArrowDownToLine,  // Main Wallet Request
<<<<<<< HEAD
  ArrowUpFromLine   // Withdrawal Request
=======
  ArrowUpFromLine,  // Withdrawal Request
  X                 // Close icon
>>>>>>> 2b004b1 (updated code)
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../Images/Logo.png";
import "../Css/Sidebar.css";

<<<<<<< HEAD
const Sidebar = ({ isOpen }) => {
=======
const Sidebar = ({ isOpen, toggleSidebar }) => {
>>>>>>> 2b004b1 (updated code)

  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

<<<<<<< HEAD
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Money Mining Logo" className="logo-img" />
=======
        {/* Header with Logo and Close Button */}
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="Money Mining Logo" className="logo-img" />
          </div>
          {/* Close button - always rendered, shown by CSS media query on mobile */}
          <button
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
>>>>>>> 2b004b1 (updated code)
        </div>

        {/* Navigation */}
        <nav>

          {/* Dashboard */}
          <a
            className={isActive("/dashboard") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard")}
=======
            onClick={() => {
              navigate("/dashboard");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <LayoutDashboard />
            {isOpen && <span>Dashboard</span>}
          </a>

          {/* User Management */}
          <a
            className={isActive("/dashboard/usermanagement") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/usermanagement")}
=======
            onClick={() => {
              navigate("/dashboard/usermanagement");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <Users />
            {isOpen && <span>User Management</span>}
          </a>

          {/* Messages */}
          <a
            className={isActive("/dashboard/supporttickets") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/supporttickets")}
=======
            onClick={() => {
              navigate("/dashboard/supporttickets");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <MessageSquare />
            {isOpen && <span>Messages</span>}
          </a>

          {/* KYC Approvals */}
          <a
            className={isActive("/dashboard/approvalpage") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/approvalpage")}
=======
            onClick={() => {
              navigate("/dashboard/approvalpage");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <CheckCircle />
            {isOpen && <span>KYC Approvals</span>}
          </a>

          {/* Bank Approvals */}
          <a
            className={isActive("/dashboard/BankApproval") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/BankApproval")}
=======
            onClick={() => {
              navigate("/dashboard/BankApproval");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <Building2 />
            {isOpen && <span>Bank Approvals</span>}
          </a>

          {/* User Daily Wallet Amount */}
          <a
            className={isActive("/dashboard/Userdailywalletprofit") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/Userdailywalletprofit")}
=======
            onClick={() => {
              navigate("/dashboard/Userdailywalletprofit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <Wallet />
            {isOpen && <span>User Daily Wallet Amount</span>}
          </a>

          {/* User Daily Referral Profit */}
          <a
            className={isActive("/dashboard/Userdailyreferralprofit") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/Userdailyreferralprofit")}
=======
            onClick={() => {
              navigate("/dashboard/Userdailyreferralprofit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <HandCoins />
            {isOpen && <span>User Daily Referal Profit</span>}
          </a>

          {/* Deposit */}
          <a
            className={isActive("/dashboard/deposit") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/deposit")}
=======
            onClick={() => {
              navigate("/dashboard/deposit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <FileText />
            {isOpen && <span>Deposit</span>}
          </a>

          {/* Main Wallet Request */}
          <a
            className={isActive("/dashboard/WalletRequestListAdmin") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/WalletRequestListAdmin")}
=======
            onClick={() => {
              navigate("/dashboard/WalletRequestListAdmin");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <ArrowDownToLine />
            {isOpen && <span>Main Wallet Request</span>}
          </a>

          {/* Withdrawal Request */}
          <a
            className={isActive("/dashboard/NormalwalletRequestListAdmin") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/NormalwalletRequestListAdmin")}
=======
            onClick={() => {
              navigate("/dashboard/NormalwalletRequestListAdmin");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <ArrowUpFromLine />
            {isOpen && <span>Withdrawal Request</span>}
          </a>

          {/* Reports */}
          <a
            className={isActive("/dashboard/reports") ? "active" : ""}
<<<<<<< HEAD
            onClick={() => navigate("/dashboard/reports")}
=======
            onClick={() => {
              navigate("/dashboard/reports");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
>>>>>>> 2b004b1 (updated code)
          >
            <BarChart3 />
            {isOpen && <span>Reports</span>}
          </a>

        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">

          {/* Admin Profile */}
          <div
            className="admin-info"
            onClick={() => navigate("/dashboard/profile")}
          >
            <div className="admin-avatar">
              <User size={20} />
            </div>

            {isOpen && (
              <div>
                <p className="admin-name">Administrator</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            className="logout"
            onClick={() => setShowLogoutPopup(true)}
          >
            <LogOut />
            {isOpen && <span style={{fontFamily: "Maiandra GD, sans-serif"}}>Logout</span>}
          </button>

        </div>

      </aside>

      {/* Logout Modal */}
      {showLogoutPopup && (
        <div className="logout-overlay">

          <div className="logout-modal">

            <h3>Confirm Logout</h3>

            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutPopup(false)}
              >
                No
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Sidebar;