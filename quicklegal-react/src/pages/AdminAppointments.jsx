import { useEffect, useState } from "react";
import "./Appointment.css";

function AdminAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const updateStatus = (id, status) => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];

    const updated = data.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  return (
    <div className="admin-page">

      <h1 className="title">Appointments Management</h1>

      <div className="total-box">
        Total Bookings: <span>{appointments.length}</span>
      </div>

      <div className="appointments-grid">

        {appointments.map((a) => (
          <div className="appointment-card" key={a.id}>

            <h3>{a.lawyer}</h3>

            <p><b>User:</b> {a.userName}</p>
            <p><b>Date:</b> {a.date}</p>

            <p className={`status ${a.status === "Approved" ? "approved" : "rejected"}`}>
              {a.status}
            </p>

            <div className="btn-group">

              <button
                className="approve"
                onClick={() => updateStatus(a.id, "Approved")}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => updateStatus(a.id, "Rejected")}
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminAppointments;