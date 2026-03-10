import React, { useState, useRef } from "react";
import "../Css/Report.css";
import { Download, Calendar, FileText, Filter } from "lucide-react";

const reportsData = [
  { date: "2023-10-24", type: "Deposit", user: "John Doe", amount: 5000, status: "completed" },
  { date: "2023-10-24", type: "Withdrawal", user: "Sarah Smith", amount: -200, status: "pending" },
  { date: "2023-10-23", type: "ROI", user: "Mike Johnson", amount: 150, status: "completed" },
  { date: "2023-10-23", type: "Deposit", user: "Emily Davis", amount: 10000, status: "completed" },
  { date: "2023-10-22", type: "Withdrawal", user: "Alex Wilson", amount: -50, status: "rejected" }
];

const Reports = () => {
  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState("2023-10-31");
  const [userScope, setUserScope] = useState("all");
  const [search, setSearch] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [showDownload, setShowDownload] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  /* 🔍 FILTER */
  const filteredData = reportsData.filter(item => {
    const d = new Date(item.date);

    const matchDate =
      (!startDate || d >= new Date(startDate)) &&
      (!endDate || d <= new Date(endDate));

    const matchUser =
      userScope === "all" ||
      item.user.toLowerCase().includes(search.toLowerCase());

    return matchDate && matchUser;
  });

  /* 📊 CSV */
  const downloadExcel = () => {
    if (!filteredData.length) return alert("No data to download");

    const headers = "Date,Type,User,Amount,Status\n";
    const rows = filteredData
      .map(r => `${r.date},${r.type},${r.user},${r.amount},${r.status}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
    setShowDownload(false);
  };

  const downloadPDF = () => {
    if (!filteredData.length) return alert("No data to print");
    window.print();
    setShowDownload(false);
  };

  return (
    <div className="reports-page">

      <h1>Reports</h1>
      <p className="subtitle">Generate and download financial reports</p>

      <div className="reports-layout">
        {/* LEFT PANEL */}
        <div className="settings-card">

          <div className="settings-header">
            <h3>Report Settings</h3>

            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              title="Toggle Filters"
            >
              <Filter size={18} />
            </button>
          </div>

          {showFilters && (
            <>
              <label>Date Range</label>

              <div className="date-range">
                <div className="date-input">
                  <Calendar
                    size={16}
                    className="calendar-icon"
                    onClick={() => startDateRef.current.showPicker()}
                  />
                  <input
                    ref={startDateRef}
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>

                <span className="date-separator">–</span>

                <div className="date-input">
                  <Calendar
                    size={16}
                    className="calendar-icon"
                    onClick={() => endDateRef.current.showPicker()}
                  />
                  <input
                    ref={endDateRef}
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <label>User Scope</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={userScope === "all"}
                    onChange={() => setUserScope("all")}
                  />
                  All Users
                </label>

                <label>
                  <input
                    type="radio"
                    checked={userScope === "individual"}
                    onChange={() => setUserScope("individual")}
                  />
                  Individual User
                </label>
              </div>

              {userScope === "individual" && (
                <input
                  className="user-search"
                  placeholder="Search user..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              )}

              <label>Frequency</label>
              <div className="toggle-group">
                <button className={frequency === "daily" ? "active" : ""} onClick={() => setFrequency("daily")}>Daily</button>
                <button className={frequency === "weekly" ? "active" : ""} onClick={() => setFrequency("weekly")}>Weekly</button>
                <button className={frequency === "monthly" ? "active" : ""} onClick={() => setFrequency("monthly")}>Monthly</button>
              </div>
            </>
          )}

          <button className="download-btn" onClick={() => setShowDownload(true)}>
            <Download size={18} />
            Download Report
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="preview-card">
          <div className="preview-header">
            <h3><FileText size={18} /> Report Preview</h3>
            <span className="badge">{frequency.toUpperCase()} VIEW</span>
          </div>

          {filteredData.length === 0 ? (
            <p className="footer-text">No data found for selected filters.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.type}</td>
                    <td>{row.user}</td>
                    <td className={row.amount > 0 ? "green" : "red"}>
                      ₹{Math.abs(row.amount)}
                    </td>
                    <td>
                      <span className={`status ${row.status}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showDownload && (
        <div className="modal-overlay" onClick={() => setShowDownload(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h4>Select Download Format</h4>

            <button className="modal-btn excel" onClick={downloadExcel}>
              Download Excel
            </button>

            <button className="modal-btn pdf" onClick={downloadPDF}>
              Download PDF
            </button>

            <button className="modal-close" onClick={() => setShowDownload(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
