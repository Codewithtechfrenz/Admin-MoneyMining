import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Users,
  UserCheck,
  UserPlus,
  AlertCircle,
  Wallet,
  TrendingUp,
  DollarSign,
  X,
  Calendar,
  Clock,
  IndianRupeeIcon
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../Css/Dashboard.css";

// ---------- Graph Data ----------
const generateGraphData = (baseValue, trend, days = 30) => {
  const data = [];
  let current = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const random = Math.random() * 0.2 - 0.05;
    const factor = trend === "up" ? 1.01 : trend === "down" ? 0.99 : 1;

    current = current * (1 + random) * factor;
    if (current < 0) current = 0;

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      amount: Math.round(current)
    });
  }

  return data;
};

const Dashboard = () => {

  const [selectedStat, setSelectedStat] = useState(null);

  // Live date & time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // ESC key close modal
  useEffect(() => {

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedStat(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);

  }, []);

  const stats = [
    { title: "Total Deposit", value: "0", raw: 1240500, icon: Wallet, trend: "up", change: "+12.5%" },
    { title: "Daily ROI", value: "0", raw: 450200, icon: TrendingUp, trend: "up", change: "+5.2%" },
    { title: "Today's Withdraw", value: "0", raw: 12500, icon: ArrowUpRight, trend: "down", change: "-2.1%" },
    { title: "Account Balance", value: "0", raw: 850320, icon: IndianRupeeIcon, trend: "down", change: "-1.2%" },
    { title: "Total Users", value: "0", raw: 2450, icon: Users, trend: "up", change: "+150 this week" },
    { title: "Active Users", value: "0", raw: 1890, icon: UserCheck, trend: "neutral", change: "77%" },
    { title: "New Approvals", value: "0", raw: 12, icon: UserPlus },
    { title: "Open Tickets", value: "0", raw: 5, icon: AlertCircle }
  ];

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>
          <p>Overview of your platform performance</p>
        </div>

        <div className="live-date-time">

          <div className="date-row">
            <Calendar size={14} />
            <span>
              {currentDateTime
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}
            </span>
          </div>

          <div className="time-row">
            <Clock size={14} />
            <span>
              {currentDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              })}
            </span>
          </div>

        </div>

      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">

        <div className="system-status">
          <span className="status-dot"></span>
          <span className="status-text" style={{fontFamily: "Maiandra GD, sans-serif"}}>System Online</span>
        </div>

        <h1 style={{fontFamily: "Maiandra GD, sans-serif"}}>Welcome Back, Admin</h1>

        <h4>
          Invest in yourself as much as you can; you are your own biggest asset by far.
          <br />
          You need to know very well when to move away, or give up the loss, and not
          allow the anxiety to trick you into trying again.
        </h4>

      </div>

      {/* Stats */}
      <div className="stats-grid">

        {stats.map((stat, i) => (

          <div
            key={i}
            className="stat-card"
            onClick={() =>
              stat.trend &&
              setSelectedStat({
                ...stat,
                data: generateGraphData(stat.raw, stat.trend)
              })
            }
          >

            <div className="stat-top">

              <div className="stat-icon">
                <stat.icon size={22} />
              </div>

              <span
                className={`stat-change ${
                  stat.change?.startsWith("+")
                    ? "positive"
                    : stat.change?.startsWith("-")
                    ? "negative"
                    : ""
                }`}
              >
                {stat.change}
              </span>

            </div>

            <p className="stat-title">{stat.title}</p>
            <h3 className="stat-value">{stat.value}</h3>

          </div>

        ))}

      </div>

      {/* Graph Modal */}
      {selectedStat && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedStat(null)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <h2>{selectedStat.title} Analysis</h2>

              <button
                className="modal-close-btn"
                onClick={() => setSelectedStat(null)}
              >
                <X size={20} />
              </button>

            </div>

            <ResponsiveContainer width="100%" height={320}>

              <AreaChart data={selectedStat.data}>

                <defs>
                  <linearGradient id="yellow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5c000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f5c000" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#222" vertical={false} />
                <XAxis dataKey="date" stroke="#666" /><br></br>
                <YAxis stroke="#666" />
                <Tooltip />

                <Area
                  dataKey="amount"
                  stroke="#f5c000"
                  fill="url(#yellow)"
                  strokeWidth={2}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;