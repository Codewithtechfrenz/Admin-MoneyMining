import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/bankApproval.css";

const BankVerificationManagement = () => {
  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  const [bankList, setBankList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("all");
  const [email, setEmail] = useState("");

  const [selectedBank, setSelectedBank] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  // ================= FETCH LIST =================
  const fetchBankList = async () => {
    try {
      const payload = {
        pageNo,
        pageSize: 10,
        status,
        ...(email ? { email } : {}),
      };

      const response = await axios.post(
        `${BASE_URL}/admin/userBankVerificationListAdmin`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.status == 1) {
        setBankList(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Bank List Error:", error);
    }
  };

  useEffect(() => {
    fetchBankList();
  }, [pageNo, status]);

  // Debounce email search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPageNo(1);
      fetchBankList();
    }, 500);

    return () => clearTimeout(delay);
  }, [email]);

  // ================= FETCH SINGLE DETAILS =================
  const handleEdit = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/getSingleKycDetail`,
        { user_id: userId },
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.status == 1) {
        setSelectedBank(response.data.data);
        setModalOpen(true);
        setRejectReason("");
      } else {
        alert(response?.data?.message || "Unable to fetch details");
      }
    } catch (error) {
      console.error("Single Bank Error:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBank(null);
  };

  // ================= VERIFY BANK =================
  const handleVerifyBank = async (type) => {
    try {
      if (!selectedBank?.user_id) {
        alert("User ID missing");
        return;
      }

      if (type === "reject" && !rejectReason.trim()) {
        alert("Please enter reject reason");
        return;
      }

      const payload = {
        user_id: selectedBank.user_id.toString(),
        bank_status: type === "approve" ? "1" : "2",
        reject_reason: type === "reject" ? rejectReason : "",
      };

      const response = await axios.post(
        `${BASE_URL}/admin/verifyBankAdmin`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Verify Response:", response.data);

      if (response?.data?.status == 1) {
        alert(response.data.message || "Updated successfully");

        // 🔥 Update grid instantly
        setBankList((prev) =>
          prev.map((item) =>
            item.id === selectedBank.id
              ? {
                  ...item,
                  is_bank_verified: Number(response.data.is_bank_verified),
                }
              : item
          )
        );

        closeModal();
      } else {
        alert(response?.data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Verify Bank Error:", error);
      alert("Server error. Please try again.");
    }
  };

  const formatStatus = (status) => {
    if (status == 0) return "Pending";
    if (status == 1) return "Approved";
    if (status == 2) return "Rejected";
    return "-";
  };

  return (
    <div className="deposit-page">
      <div className="deposit-header">
        <div>
          <h2>Bank Verification Management</h2>
          <p>View and filter user bank verification details</p>
        </div>

        <div className="filter-box">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="deposit-table">
        <div className="table-head">
          <span>ID</span>
          <span>Username</span>
          <span>Email</span>
          <span>Mobile</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {bankList.length ? (
          bankList.map((item) => (
            <div className="table-row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.username}</span>
              <span>{item.email}</span>
              <span>{item.mblno}</span>
              <span>{formatStatus(item.is_bank_verified)}</span>
              <span>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item.id)}
                >
                  View
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="no-results">
            No bank verification records found
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)}>
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

      {/* MODAL */}
      {modalOpen && selectedBank && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <h3>Bank Details - {selectedBank.username}</h3>

            <div className="kyc-section">
              <p>
                <strong>Account Number:</strong>{" "}
                {selectedBank.bank_details?.account_number || "-"}
              </p>

              <p>
                <strong>IFSC Code:</strong>{" "}
                {selectedBank.bank_details?.ifsc_code || "-"}
              </p>

              <div className="image-row">
                {selectedBank.bank_details?.passbook_image && (
                  <img
                    src={selectedBank.bank_details.passbook_image}
                    alt="Passbook"
                    className="kyc-img"
                  />
                )}
              </div>

              <textarea
                placeholder="Reject reason (required if rejecting)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                className="approve-btn"
                onClick={() => handleVerifyBank("approve")}
              >
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => handleVerifyBank("reject")}
              >
                Reject
              </button>

              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankVerificationManagement;