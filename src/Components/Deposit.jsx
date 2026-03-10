import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/DepositManagement.css";

const DepositManagement = () => {

  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  const [deposits, setDeposits] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // =============================
  // FETCH DEPOSIT LIST
  // =============================
  const fetchDeposits = async () => {
    try {
      const payload = {
        pageNo: pageNo,
        pageSize: 6
      };

      if (status !== "") payload.status = Number(status);
      if (search !== "") payload.search = search;
      if (fromDate !== "") payload.fromDate = fromDate;
      if (toDate !== "") payload.toDate = toDate;

      const response = await axios.post(
        `${BASE_URL}/admin/depositList`,
        payload,
        {
          headers: {
            authorization: AUTH_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        setDeposits(response.data.data);
        setTotalPages(response.data.totalPages);
      }

    } catch (error) {
      console.error("Deposit Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [pageNo, status]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchDeposits();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [search, fromDate, toDate]);

  const getStatusText = (status) => {
    if (status === "created") return "Created";
    if (status === "paid") return "Paid";
    if (status === "failed") return "Failed";
    return "-";
  };

  return (
    <div className="deposit-page">

      <div className="deposit-header">
        <div>
          <h2>Deposit Management</h2>
          <p>View and filter user deposits</p>
        </div>

        <div className="filter-box">

          {/* STATUS FILTER */}
          <select
            value={status}
            onChange={(e) => {
              setPageNo(1);
              setStatus(e.target.value);
            }}
            className="filter-input"
          >
            <option value="">All Status</option>
            <option value="0">Created</option>
            <option value="1">Paid</option>
            <option value="2">Failed</option>
          </select>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-input"
          />

          {/* DATE FILTER */}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="filter-input"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="filter-input"
          />

        </div>
      </div>

      {/* TABLE */}
      <div className="deposit-table">

        <div className="table-head">
          <span>ID</span>
          <span>User ID</span>
          <span>Amount</span>
          <span>Currency</span>
          <span>Order ID</span>
          <span>Status</span>
          <span>Payment ID</span>
          <span>Created Date</span>
        </div>

        {deposits.length ? (
          deposits.map((item) => (
            <div className="table-row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.user_id}</span>
              <span>₹{item.amount}</span>
              <span>{item.currency}</span>
              <span>{item.order_id}</span>
              <span>{getStatusText(item.order_status)}</span>
              <span>{item.payment_id || "-"}</span>
              <span>
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className="no-results">No deposits found</div>
        )}
      </div>

      {/* PAGINATION */}
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

    </div>
  );
};

export default DepositManagement;