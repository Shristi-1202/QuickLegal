import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminDashboard() {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // 🔥 LOAD APPOINTMENTS
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  return (
    <div className="dashboard-container">

      <h2 className="dash-title">Admin Dashboard</h2>

      <div className="card-grid">

        {/* 🔥 NOTARY */}
        <div 
          className="dash-card"
          onClick={() => navigate("/admin/notary")}
        >
          📄
          <h3>Notary Requests</h3>
          <p>Manage all notarized documents</p>
        </div>

        {/* 🔥 QUERY */}
        <div 
          className="dash-card"
          onClick={() => navigate("/admin/query")}
        >
          ⚖️
          <h3>Legal Queries</h3>
          <p>View and respond to user queries</p>
        </div>

        {/* 🔥 APPOINTMENTS (FIXED UI) */}
        <div 
          className="dash-card"
          onClick={() => navigate("/admin/appointments")}
        >
          👨‍⚖️
          <h3>Appointments</h3>
          <p>Manage lawyer bookings</p>

          {/* ✅ ONLY COUNT SHOW */}
          

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;