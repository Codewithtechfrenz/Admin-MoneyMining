import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/userdailywalletprofit.css";

const Userdailywalletprofit = () => {
  const [profits, setProfits] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  const fetchProfits = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/userDailyWalletProfitAdmin`,
        { pageNo, pageSize, email: emailFilter },
        { headers: { authorization: AUTH_TOKEN } }
      );

      if (response.data.status === 1) {
        setProfits(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfits();
  }, [pageNo, emailFilter]);

  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount || 0);
  };

  return (
    <div className="daily-wallet-page">

      <div className="wallet-header">
        <h2>User Daily Wallet Profit</h2>
        <input
          type="text"
          placeholder="Search by email..."
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
      </div>

      <div className="wallet-table">

        <div className="table-head">
          <span>User Name</span> 
          <span>Email</span>
          <span>Profit Date</span>
          <span>Wallet Profit(ROI of 0.30%)</span>
        </div>

        {profits.length ? (
          profits.map((item, idx) => (
            <div className="table-row" key={idx}>
              <span>{item.username}</span>
              <span>{item.email}</span>
              <span>{formatDate(item.profit_date)}</span>
              <span className="green">{formatCurrency(item.wallet_profit)}</span>
            </div>
          ))
        ) : (
          <div className="no-results">No records found</div>
        )}

      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={pageNo === 1}>
          Prev
        </button>
        <span>
          {pageNo} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={pageNo === totalPages}>
          Next
        </button>
      </div>

    </div>
  );
};

export default Userdailywalletprofit;