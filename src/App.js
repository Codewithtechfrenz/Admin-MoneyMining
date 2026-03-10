import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AdminLayout from "./Layout/AdminLayout";
import Profile from "./Components/Profile";
import UserManagement from "./Components/UserManagement";
import SupportTickets from "./Components/SupportTickets";
import ApprovalPage from "./Components/Approval";
import UserBankVerification from "./Components/UserBankVerification";
import Deposit from "./Components/Deposit";
import WalletRequestListAdmin from "./Components/WalletRequestListAdmin";
import NormalwalletRequestListAdmin from "./Components/NormalwalletRequestListAdmin";
import Reports from "./Components/Report";
import Userdailywalletprofit from "./Components/Userdailywalletprofit";
import Userdailyreferralprofit from "./Components/Userdailyreferralprofit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="profile" element={<Profile />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="supporttickets" element={<SupportTickets />} />
          <Route path="approvalpage" element={<ApprovalPage />} />
          <Route path="BankApproval" element={<UserBankVerification />} />
          <Route path="Deposit" element={<Deposit />} />
          <Route path="WalletRequestListAdmin" element={<WalletRequestListAdmin />} />
          <Route path="NormalwalletRequestListAdmin" element={<NormalwalletRequestListAdmin />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="userdailywalletprofit" element={<Userdailywalletprofit />} />
          <Route path="Userdailyreferralprofit" element={<Userdailyreferralprofit />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
