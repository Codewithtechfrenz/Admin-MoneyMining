import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Userdailyreferralprofit.css";

const Userdailyreferralprofit = () => {
  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  // --- Referral Profit State ---
  const [referrals, setReferrals] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // --- Email Filter ---
  const [emailFilter, setEmailFilter] = useState("");

  // --- Fetch Referral Profits ---
  const fetchReferrals = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/userDailyReferralProfitAdmin`,
        { pageNo, pageSize, email: emailFilter },
        { headers: { authorization: AUTH_TOKEN } }
      );
      if (res.data.status === 1) {
        setReferrals(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Referral Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [pageNo, emailFilter]);

  // --- Pagination Handlers ---
  const handlePrev = () => pageNo > 1 && setPageNo(pageNo - 1);
  const handleNext = () => pageNo < totalPages && setPageNo(pageNo + 1);

  // --- Helpers ---
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);

  return (
    <div className="daily-referral-page">
      <div className="wallet-header">
        <h2>User Daily Referral Profits</h2>
        <input
          type="text"
          placeholder="Search by email..."
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
      </div>

      {/* --- REFERRAL PROFIT TABLE --- */}
      <div className="wallet-table">
        <div className="table-head">
          <span>Referrer Name</span>
          <span>Referrer Email</span>
          <span>Referred Name</span>
          <span>Referred Email</span>
          <span>Bonus Date</span>
          <span>Referral Bonus</span>
        </div>

        {referrals.length ? (
          referrals.map((item, idx) => (
            <div className="table-row" key={`referral-${idx}-${item.referrer_email}`}>
              <span>{item.referrer_username}</span>
              <span>{item.referrer_email}</span>
              <span>{item.referred_username}</span>
              <span>{item.referred_email}</span>
              <span>{formatDate(item.bonus_date)}</span>
              <span className="green">{formatCurrency(item.referral_bonus)}</span>
            </div>
          ))
        ) : (
          <div className="no-results">No records found</div>
        )}

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
    </div>
  );
};

export default Userdailyreferralprofit;