import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/SupportTickets.css";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [emailFilter, setEmailFilter] = useState("");

  const BASE_URL = "https://werner-desertic-lorinda.ngrok-free.dev";
  const AUTH_TOKEN = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTickets();
  }, []);

  // ================= GET ALL TICKETS =================
  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllTickets`, {
        headers: { authorization: AUTH_TOKEN }
      });

      if (res.data.status === 1) {
        setTickets(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch Tickets Error:", err);
    }
  };

  // ================= GET TICKET DETAILS =================
  const fetchTicketDetails = async (ticketId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/ticketDetailsAdmin`,
        { ticket_id: ticketId },
        { headers: { authorization: AUTH_TOKEN } }
      );

      if (res.data.status === 1) {
        setSelectedTicket(res.data.ticket);
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      console.error("Ticket Details Error:", err);
    }
  };

  // ================= SEND REPLY =================
  const sendReply = async () => {
    if (!reply.trim()) return;

    try {
      await axios.post(
        `${BASE_URL}/admin/replyTicketAdmin`,
        {
          ticket_id: selectedTicket.ticket_id,
          message: reply
        },
        { headers: { authorization: AUTH_TOKEN } }
      );

      setReply("");

      fetchTicketDetails(selectedTicket.ticket_id);
    } catch (err) {
      console.error("Reply Error:", err);
    }
  };

  // ================= CLOSE TICKET =================
  const closeTicket = async () => {
    try {
      await axios.post(
        `${BASE_URL}/admin/closeTicketAdmin`,
        { ticket_id: selectedTicket.ticket_id },
        { headers: { authorization: AUTH_TOKEN } }
      );

      fetchTickets();
      fetchTicketDetails(selectedTicket.ticket_id);
    } catch (err) {
      console.error("Close Ticket Error:", err);
    }
  };

  // ================= FILTER =================
  const filteredTickets = tickets.filter((ticket) => {
    const matchStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    const matchEmail =
      ticket.email &&
      ticket.email.toLowerCase().includes(emailFilter.toLowerCase());

    return matchStatus && matchEmail;
  });

  return (
    <div className="tickets-page">

      {/* LEFT PANEL */}
      <div className="ticket-list">

        <div className="ticket-filters">

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <input
            type="text"
            placeholder="Search by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />

        </div>

        {filteredTickets.map((ticket) => (

          <div
            key={ticket.ticket_id}
            className={`ticket-item ${
              selectedTicket?.ticket_id === ticket.ticket_id
                ? "active"
                : ""
            }`}
            onClick={() => fetchTicketDetails(ticket.ticket_id)}
          >

            <h4>{ticket.subject}</h4>
            <p>{ticket.email}</p>

            <span className={`status ${ticket.status}`}>
              {ticket.status}
            </span>

          </div>

        ))}

      </div>

      {/* RIGHT PANEL */}
      <div className="ticket-view">

        {selectedTicket ? (
          <>
            <div className="ticket-header">

              <div>
                <h3>{selectedTicket.subject}</h3>
                <p>
                  {selectedTicket.username} ({selectedTicket.email})
                </p>
              </div>

              <div>

                <span className={`status ${selectedTicket.status}`}>
                  {selectedTicket.status}
                </span>

                {selectedTicket.status !== "closed" && (
                  <button
                    className="close-btn"
                    onClick={closeTicket}
                  >
                    Close
                  </button>
                )}

              </div>

            </div>

            {/* MESSAGES */}
            <div className="ticket-messages">

              {messages.map((msg) => (

                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "admin" ? "admin" : "user"
                  }`}
                >
                  <div className="bubble">{msg.message}</div>
                </div>

              ))}

            </div>

            {/* REPLY */}
            {selectedTicket.status !== "closed" && (

              <div className="ticket-reply">

                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type reply..."
                />

                <button onClick={sendReply}>
                  Send
                </button>

              </div>

            )}

          </>
        ) : (

          <div className="empty-view">
            Select a ticket to view details
          </div>

        )}

      </div>

    </div>
  );
};

export default AdminTickets;