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

  // Fetch withdrawal requests
  const fetchWithdrawList = async () => {
    try {
      const payload = {
        pageNo: pageNo.toString(),
        pageSize: "10",
        status: statusFilter,
        ...(emailSearch ? { email: emailSearch } : {}),
      };

      const response = await axios.post(
        `${BASE_URL}/admin/userWithdrawListAdmin`,
        payload,
        { headers: { authorization: AUTH_TOKEN, "Content-Type": "application/json" } }
      );

      if (response?.data?.status === 1) {
        setWithdrawList(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Withdraw List Error:", error);
    }
  };

  // Fetch on mount and when page/status changes
  useEffect(() => {
    fetchWithdrawList();
  }, [pageNo, statusFilter]);

  // Search with debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      setPageNo(1);
      fetchWithdrawList();
    }, 500);
    return () => clearTimeout(delay);
  }, [emailSearch]);

  // Update withdrawal status (admin-only: approve or reject)
  const handleUpdateStatus = async (type) => {
    if (!selectedId) return;
    setLoading(true);

    const selectedItem = withdrawList.find(item => item.id === selectedId);
    if (!selectedItem) return;

    let url = "";
    let payload = {};

    if (type === "approve") {
      url = `${BASE_URL}/admin/approveWithdraw`;
      payload = { withdrawal_id: selectedItem.id.toString() };
    } else if (type === "reject") {
      url = `${BASE_URL}/admin/updateWithdrawStatusAdmin`;
      payload = {
        user_id: selectedItem.user_id.toString(),
        status: "rejected",
        remarks: "Rejected by admin",
      };
    }

    try {
      const response = await axios.post(url, payload, {
        headers: { authorization: AUTH_TOKEN, "Content-Type": "application/json" },
      });

      if (response?.data?.status === 1) {
        alert(response.data.message);
        setWithdrawList(prev =>
          prev.map(item =>
            item.id === selectedId
              ? {
                  ...item,
                  status: type === "approve" ? "verified" : "rejected",
                  remarks: type === "approve" ? response.data.message : "Rejected by admin",
                  razorpay_status: type === "approve" ? response.data.razorpay_status : item.razorpay_status,
                }
              : item
          )
        );
      } else {
        alert(response?.data?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const formatStatus = (status) => {
    if (!status) return "-";
    if (status === "approved") return "Verified";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status) => {
    if (status === "pending") return "status-badge pending";
    if (status === "verified") return "status-badge verified";
    if (status === "rejected" || status === "failed") return "status-badge rejected";
    return "status-badge";
  };

  return (
    <div className="withdraw-page">
      {/* Header */}
      <div className="withdraw-header">
        <div>
          <h2>Withdraw Request Management</h2>
          <br/>
          <p>View, verify, or reject user withdrawal requests</p>
        </div>

        {/* Filters */}
        <div className="filter-box">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPageNo(1); }}
            className="filter-input"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
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

      {/* Table */}
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
            <span>Razorpay Status</span>
            <span>Remarks</span>
            <span>Actions</span>
          </div>

          {withdrawList.length ? (
            withdrawList.map(item => (
              <div className="table-row" key={item.id}>
                <span>{item.id}</span>
                <span>{item.user_id}</span>
                <span>{item.username || "-"}</span>
                <span>{item.email || "-"}</span>
                <span>{item.mblno || "-"}</span>
                <span>₹ {item.amount}</span>
                <span className={getStatusClass(item.status)}>
                  {formatStatus(item.status)}
                </span>
                <span>{item.razorpay_status || "-"}</span>
                <span>{item.remarks || "-"}</span>
                <span>
                  {item.status === "pending" ? (
                    <button
                      className="edit-btn"
                      onClick={() => { setSelectedId(item.id); setShowModal(true); }}
                    >
                      Action
                    </button>
                  ) : "-"}
                </span>
              </div>
            ))
          ) : (
            <div className="no-results">No withdrawal requests found</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)}>Previous</button>
        <span>Page {pageNo} of {totalPages}</span>
        <button disabled={pageNo === totalPages} onClick={() => setPageNo(pageNo + 1)}>Next</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Withdrawal Status</h3><br/>
            <p>Do you want to verify or reject this request?</p>

            <div className="modal-actions">
              <button
                className="approve-btn"
                disabled={loading}
                onClick={() => handleUpdateStatus("approve")}
              >
                {loading ? "Processing..." : "Verify"}
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
                onClick={() => { setShowModal(false); setSelectedId(null); }}
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