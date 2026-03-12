import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/getUserDetails`,
        {
          pageNo: 1,
          pageSize: 20,
          search: ""
        },
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === 1) {
        setUsers(response.data.data); // ✅ DIRECT API DATA
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const getStatus = (status) => {
    if (status === 1) return "approved";
    if (status === 2) return "rejected";
    return "pending";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount || 0);
  };

  return (
    <div className="user-page">
      <div className="user-table">

        {/* HEADER */}
<<<<<<< HEAD
        <div className="table-head" style={{ gridTemplateColumns: "0.4fr 1.3fr 2fr 1.1fr 1fr 1.3fr 1.1fr 1.4fr 1.2fr 1.2fr" }}>
=======
        <div className="table-head">
>>>>>>> 2b004b1 (updated code)
          <span>ID</span>
          <span>Username</span>
          <span>Email</span>
          <span>Mobile</span>
          

          <span>Created At</span>
          <span>Main Wallet</span>
          <span>Wallet</span>
          <span>Total Deposited</span>
          <span>KYC</span>
          <span>Bank</span>
        </div>

        {/* BODY */}
        {users.length ? (
          users.map((user, i) => (
            <div
              className="table-row"
              key={user.user_id || i}
<<<<<<< HEAD
              style={{ gridTemplateColumns: "0.4fr 1.3fr 2fr 1.1fr 1fr 1.3fr 1.1fr 1.4fr 1.2fr 1.2fr" }}
=======
>>>>>>> 2b004b1 (updated code)
            >
              <span>{user.user_id}</span>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.mblno}</span>

             

              <span>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-IN")
                  : "-"}
              </span>

              <span className="money">
                {formatCurrency(user.main_wallet)}
              </span>

              <span className="money">
                {formatCurrency(user.wallet)}
              </span>

              <span className="money">
                {formatCurrency(user.total_deposited)}
              </span>

               <span className={`status ${getStatus(user.is_kyc_verified)}`}>
                {getStatus(user.is_kyc_verified)}
              </span>

              <span className={`status ${getStatus(user.is_bank_verified)}`}>
                {getStatus(user.is_bank_verified)}
              </span>
            </div>
          ))
        ) : (
          <div className="no-results">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;