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
  ArrowUpFromLine   // Withdrawal Request
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../Images/Logo.png";
import "../Css/Sidebar.css";

const Sidebar = ({ isOpen }) => {

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

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Money Mining Logo" className="logo-img" />
        </div>

        {/* Navigation */}
        <nav>

          {/* Dashboard */}
          <a
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard />
            {isOpen && <span>Dashboard</span>}
          </a>

          {/* User Management */}
          <a
            className={isActive("/dashboard/usermanagement") ? "active" : ""}
            onClick={() => navigate("/dashboard/usermanagement")}
          >
            <Users />
            {isOpen && <span>User Management</span>}
          </a>

          {/* Messages */}
          <a
            className={isActive("/dashboard/supporttickets") ? "active" : ""}
            onClick={() => navigate("/dashboard/supporttickets")}
          >
            <MessageSquare />
            {isOpen && <span>Messages</span>}
          </a>

          {/* KYC Approvals */}
          <a
            className={isActive("/dashboard/approvalpage") ? "active" : ""}
            onClick={() => navigate("/dashboard/approvalpage")}
          >
            <CheckCircle />
            {isOpen && <span>KYC Approvals</span>}
          </a>

          {/* Bank Approvals */}
          <a
            className={isActive("/dashboard/BankApproval") ? "active" : ""}
            onClick={() => navigate("/dashboard/BankApproval")}
          >
            <Building2 />
            {isOpen && <span>Bank Approvals</span>}
          </a>

          {/* User Daily Wallet Amount */}
          <a
            className={isActive("/dashboard/Userdailywalletprofit") ? "active" : ""}
            onClick={() => navigate("/dashboard/Userdailywalletprofit")}
          >
            <Wallet />
            {isOpen && <span>User Daily Wallet Amount</span>}
          </a>

          {/* User Daily Referral Profit */}
          <a
            className={isActive("/dashboard/Userdailyreferralprofit") ? "active" : ""}
            onClick={() => navigate("/dashboard/Userdailyreferralprofit")}
          >
            <HandCoins />
            {isOpen && <span>User Daily Referal Profit</span>}
          </a>

          {/* Deposit */}
          <a
            className={isActive("/dashboard/deposit") ? "active" : ""}
            onClick={() => navigate("/dashboard/deposit")}
          >
            <FileText />
            {isOpen && <span>Deposit</span>}
          </a>

          {/* Main Wallet Request */}
          <a
            className={isActive("/dashboard/WalletRequestListAdmin") ? "active" : ""}
            onClick={() => navigate("/dashboard/WalletRequestListAdmin")}
          >
            <ArrowDownToLine />
            {isOpen && <span>Main Wallet Request</span>}
          </a>

          {/* Withdrawal Request */}
          <a
            className={isActive("/dashboard/NormalwalletRequestListAdmin") ? "active" : ""}
            onClick={() => navigate("/dashboard/NormalwalletRequestListAdmin")}
          >
            <ArrowUpFromLine />
            {isOpen && <span>Withdrawal Request</span>}
          </a>

          {/* Reports */}
          <a
            className={isActive("/dashboard/reports") ? "active" : ""}
            onClick={() => navigate("/dashboard/reports")}
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