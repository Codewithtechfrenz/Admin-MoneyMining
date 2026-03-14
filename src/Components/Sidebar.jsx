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
  ArrowUpFromLine,  // Withdrawal Request
  X                 // Close icon
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../Images/Logo.png";
import "../Css/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {

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
        </div>

        {/* Navigation */}
        <nav>

          {/* Dashboard */}
          <a
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <LayoutDashboard />
            {isOpen && <span>Dashboard</span>}
          </a>

          {/* User Management */}
          <a
            className={isActive("/dashboard/usermanagement") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/usermanagement");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <Users />
            {isOpen && <span>User Management</span>}
          </a>

          {/* Messages */}
          <a
            className={isActive("/dashboard/supporttickets") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/supporttickets");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <MessageSquare />
            {isOpen && <span>Messages</span>}
          </a>

          {/* KYC Approvals */}
          <a
            className={isActive("/dashboard/approvalpage") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/approvalpage");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <CheckCircle />
            {isOpen && <span>KYC Approvals</span>}
          </a>

          {/* Bank Approvals */}
          <a
            className={isActive("/dashboard/BankApproval") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/BankApproval");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <Building2 />
            {isOpen && <span>Bank Approvals</span>}
          </a>

          {/* User Daily Wallet Amount */}
          <a
            className={isActive("/dashboard/Userdailywalletprofit") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/Userdailywalletprofit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <Wallet />
            {isOpen && <span>User Daily Wallet Amount</span>}
          </a>

          {/* User Daily Referral Profit */}
          <a
            className={isActive("/dashboard/Userdailyreferralprofit") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/Userdailyreferralprofit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <HandCoins />
            {isOpen && <span>User Daily Referal Profit</span>}
          </a>

          {/* Deposit */}
          <a
            className={isActive("/dashboard/deposit") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/deposit");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <FileText />
            {isOpen && <span>Deposit</span>}
          </a>

          {/* Main Wallet Request */}
          <a
            className={isActive("/dashboard/WalletRequestListAdmin") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/WalletRequestListAdmin");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <ArrowDownToLine />
            {isOpen && <span>Main Wallet Request</span>}
          </a>

          {/* Withdrawal Request */}
          <a
            className={isActive("/dashboard/NormalwalletRequestListAdmin") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/NormalwalletRequestListAdmin");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
          >
            <ArrowUpFromLine />
            {isOpen && <span>Withdrawal Request</span>}
          </a>

          {/* Reports */}
          <a
            className={isActive("/dashboard/reports") ? "active" : ""}
            onClick={() => {
              navigate("/dashboard/reports");
              if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
            }}
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