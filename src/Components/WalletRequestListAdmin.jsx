import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/WalletRequestListAdmin.css";

const WithdrawRequestManagement = () => {
  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  const [withdrawList, setWithdrawList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [emailSearch, setEmailSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWithdrawList = async () => {
    try {
      const payload = {
        pageNo: pageNo.toString(),
        pageSize: "10",
        status: statusFilter,
        ...(emailSearch ? { email: emailSearch } : {}),
      };

      const response = await axios.post(
        `${BASE_URL}/admin/userWalletRequestListAdmin`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.status === 1) {
        setWithdrawList(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Withdraw List Error:", error);
    }
  };

  useEffect(() => {
    fetchWithdrawList();
  }, [pageNo, statusFilter]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPageNo(1);
      fetchWithdrawList();
    }, 500);
    return () => clearTimeout(delay);
  }, [emailSearch]);

  const handleUpdateStatus = async (type) => {
    try {
      setLoading(true);

      const selectedItem = withdrawList.find(
        (item) => item.id === selectedId
      );

      if (!selectedItem) return;

      // ✅ APPROVE CASE
      if (type === "approve") {
        const payload = {
          user_id: selectedItem.user_id.toString(),
          amount: selectedItem.amount.toString(),
          wallet_req_id: selectedItem.id.toString(),
        };

        const response = await axios.post(
          `${BASE_URL}/admin/moveWalletAmount`,
          payload,
          {
            headers: {
              authorization: AUTH_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.status === 1) {
          alert(response.data.message);

          setWithdrawList((prev) =>
            prev.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    status: "approved",
                    remarks: "Approved & Amount Moved",
                  }
                : item
            )
          );
        } else {
          alert(response?.data?.message || "Approval failed");
        }
      }

      // ❌ REJECT CASE
      else {
        const payload = {
          user_id: selectedItem.user_id.toString(),
          status: "rejected",
          remarks: "Rejected by admin",
        };

        const response = await axios.post(
          `${BASE_URL}/admin/updateWithdrawStatusAdmin`,
          payload,
          {
            headers: {
              authorization: AUTH_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.status === 1) {
          alert(response.data.message || "Rejected successfully");

          setWithdrawList((prev) =>
            prev.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    status: "rejected",
                    remarks: "Rejected by admin",
                  }
                : item
            )
          );
        } else {
          alert(response?.data?.message || "Rejection failed");
        }
      }

      setShowModal(false);
      setSelectedId(null);
      setLoading(false);
    } catch (error) {
      console.error("Update Error:", error);
      alert("Server error. Please try again.");
      setLoading(false);
    }
  };

  const formatStatus = (status) => {
    if (!status) return "-";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="withdraw-page">
      <div className="withdraw-header">
        <div>
          <h2>Withdraw Request Management</h2><br/>
          <p>View, approve, or reject user withdrawal requests</p>
        </div>

        <div className="filter-box">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPageNo(1);
            }}
            className="filter-input"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="text"
            placeholder="Search by Email..."
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      <div className="withdraw-table-wrapper">
        <div className="withdraw-table">
          <div className="table-head">
            <span>ID</span>
            <span>User ID</span>
            <span>Username</span>
            <span>Email</span>
            <span>Mobile</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Remarks</span>
            <span>Actions</span>
          </div>

          {withdrawList.length ? (
            withdrawList.map((item) => (
              <div className="table-row" key={item.id}>
                <span>{item.id}</span>
                <span>{item.user_id}</span>
                <span>{item.username || "-"}</span>
                <span>{item.email || "-"}</span>
                <span>{item.mblno || "-"}</span>
                <span>₹ {item.amount}</span>
                <span>{formatStatus(item.status)}</span>
                <span>{item.remarks || "-"}</span>
                <span>
                  {item.status === "pending" ? (
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelectedId(item.id);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
            ))
          ) : (
            <div className="no-results">
              No withdrawal requests found
            </div>
          )}
        </div>
      </div>

      <div className="pagination">
        <button
          disabled={pageNo === 1}
          onClick={() => setPageNo(pageNo - 1)}
        >
          Previous
        </button>
        <span>
          Page {pageNo} of {totalPages}
        </span>
        <button
          disabled={pageNo === totalPages}
          onClick={() => setPageNo(pageNo + 1)}
        >
          Next
        </button>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Withdrawal Status</h3><br/>
            <p>Do you want to approve or reject this request?</p>

            <div className="modal-actions">
              <button
                className="approve-btn"
                disabled={loading}
                onClick={() => handleUpdateStatus("approve")}
              >
                {loading ? "Processing..." : "Approve"}
              </button>

              <button
                className="reject-btn"
                disabled={loading}
                onClick={() => handleUpdateStatus("reject")}
              >
                {loading ? "Processing..." : "Reject"}
              </button>

              <button
                className="cancel-btn"
                disabled={loading}
                onClick={() => {
                  setShowModal(false);
                  setSelectedId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawRequestManagement;