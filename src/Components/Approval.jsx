import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Approval.css";

const KycManagement = () => {
  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  const [kycList, setKycList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("all");
  const [email, setEmail] = useState("");

  const [selectedKyc, setSelectedKyc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [aadhaarRejectReason, setAadhaarRejectReason] = useState("");
  const [panRejectReason, setPanRejectReason] = useState("");

  // ================= FETCH GRID =================
  const fetchKycList = async () => {
    try {
      const payload = {
        pageNo,
        pageSize: 10,
        status: status || "all",
        ...(email ? { email } : {}),
      };

      const response = await axios.post(
        `${BASE_URL}/admin/userKycListAdmin`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        setKycList(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("KYC List Error:", error);
    }
  };

  // Reload when page or status changes
  useEffect(() => {
    fetchKycList();
  }, [pageNo, status]);

  // Debounce email search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPageNo(1);
      fetchKycList();
    }, 500);

    return () => clearTimeout(delay);
  }, [email]);

  // ================= FETCH SINGLE =================
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

      if (response.data.status === 1) {
        setSelectedKyc(response.data.data);
        setModalOpen(true);
        setAadhaarRejectReason("");
        setPanRejectReason("");
      }
    } catch (error) {
      console.error("Single KYC Error:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedKyc(null);
  };

  // ================= VERIFY KYC =================
  const handleVerifyKyc = async (type) => {
    try {
      if (
        type === "reject" &&
        (!aadhaarRejectReason.trim() || !panRejectReason.trim())
      ) {
        alert("Please enter both Aadhaar and PAN reject reasons");
        return;
      }

      const payload = {
        user_id: selectedKyc.user_id,
        aadhaar_status: type === "approve" ? "1" : "2",
        pan_status: type === "approve" ? "1" : "2",
        aadhaar_reject_reason: type === "reject" ? aadhaarRejectReason : "",
        pan_reject_reason: type === "reject" ? panRejectReason : "",
      };

      const response = await axios.post(
        `${BASE_URL}/admin/verifyKyc`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        alert(response.data.message);
        closeModal();
        fetchKycList(); // 🔥 AUTO REFRESH GRID
      }
    } catch (error) {
      console.error("Verify Error:", error);
    }
  };

  const formatStatus = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "-";

  return (
    <div className="deposit-page">
      <div className="deposit-header">
        <div>
          <h2>KYC Management</h2>
          <p>View and filter user KYC details</p>
        </div>

        {/* FILTER SECTION */}
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
            <option value="verified">verified</option>
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
          <span>Aadhaar Status</span>
          <span>PAN Status</span>
          <span>Action</span>
        </div>

        {kycList.length ? (
          kycList.map((item) => (
            <div className="table-row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.username}</span>
              <span>{item.email}</span>
              <span>{formatStatus(item.aadhaar_status_text)}</span>
              <span>{formatStatus(item.pan_status_text)}</span>
              <span>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="no-results">No KYC records found</div>
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
      {modalOpen && selectedKyc && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <h3>KYC Details - {selectedKyc.username}</h3>

            <div className="kyc-section">
              <h4>Aadhaar Details</h4>
              <p><strong>Number:</strong> {selectedKyc.kyc_details.aadhaar_number}</p>

              <div className="image-row">
                <img src={selectedKyc.kyc_details.aadhaar_front_image} className="kyc-img" />
                <img src={selectedKyc.kyc_details.aadhaar_back_image} className="kyc-img" />
              </div>

              <textarea
                placeholder="Aadhaar reject reason (if rejecting)"
                value={aadhaarRejectReason}
                onChange={(e) => setAadhaarRejectReason(e.target.value)}
              />
            </div>

            <div className="kyc-section">
              <h4>PAN Details</h4>
              <p><strong>Number:</strong> {selectedKyc.kyc_details.pan_number}</p>

              <img src={selectedKyc.kyc_details.pan_image} className="kyc-img" />

              <textarea
                placeholder="PAN reject reason (if rejecting)"
                value={panRejectReason}
                onChange={(e) => setPanRejectReason(e.target.value)}
              />
            </div>

            <div className="modal-actions">
             <center><button
                className="approve-btn"
                onClick={() => handleVerifyKyc("approve")}
              >
                Approve Both
              </button></center>

              <button
                className="reject-btn"
                onClick={() => handleVerifyKyc("reject")}
              >
                Reject Both
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

export default KycManagement;