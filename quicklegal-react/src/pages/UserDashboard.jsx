import { useState, useEffect } from "react";

function UserDashboard() {

  const [active, setActive] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 AUTO EMAIL SET
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);

  // ================== NOTARY ==================

  const handleSearch = async () => {
    if (!email) {
      alert("User email not found ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://quicklegal-vipi.onrender.com/api/notary");
      const data = await res.json();

      const filtered = data.filter(
        (item) => item.email === email
      );

      setResults(filtered);

    } catch (err) {
      alert("Error fetching data ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================== QUERY ==================

  const fetchQueries = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://quicklegal-vipi.onrender.com/api/query");
      const data = await res.json();

      const user = JSON.parse(localStorage.getItem("user"));

      // 🔥 FIX: email हटाकर name से filter
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase() === user.name.toLowerCase()
      );

      setQueries(filtered);

    } catch (err) {
      alert("Error fetching queries ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTO FETCH
  useEffect(() => {
    if (active === "notary" && email) {
      handleSearch();
    }

    if (active === "query") { // 🔥 FIX
      fetchQueries();
    }
  }, [active, email]);

  return (
    <div className="dashboard-container">

      {/* 🔥 MAIN DASHBOARD */}
      {!active && (
        <>
          <h2 className="dash-title">My Dashboard</h2>

          <div className="card-grid">

            <div className="dash-card" onClick={() => setActive("notary")}>
              📄
              <h3>Notary Requests</h3>
              <p>Track your notarized documents</p>
            </div>

            <div className="dash-card" onClick={() => setActive("query")}>
              ⚖️
              <h3>Legal Queries</h3>
              <p>View your submitted queries</p>
            </div>

            <div className="dash-card" onClick={() => setActive("appointment")}>
              👨‍⚖️
              <h3>Lawyer Appointments</h3>
              <p>Check your bookings</p>
            </div>

          </div>
        </>
      )}

      {/* ================== NOTARY ================== */}
      {active === "notary" && (
        <div className="section">

          <button className="back-btn" onClick={() => {
            setActive("");
            setResults([]);
          }}>
            ⬅ Back
          </button>

          <h2>Track Your Notary Requests</h2>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button className="search-btn" onClick={handleSearch}>
            Fetch My Requests
          </button>

          {loading && <p className="loading">Loading...</p>}

          <div className="result-grid">
            {results.length > 0 ? (
              results.map((item, index) => (
                <div className="result-card" key={index}>
                  <h3>{item.name}</h3>

                  <p>
                    <strong>Document:</strong>{" "}
                    <a
                      href={`https://quicklegal-vipi.onrender.com/uploads/${item.document}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  </p>

                  <p><strong>Status:</strong> {item.status}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("en-IN")
                      : "No Date"}
                  </p>
                </div>
              ))
            ) : (
              !loading && <p>No requests found</p>
            )}
          </div>

        </div>
      )}

      {/* ================== QUERY ================== */}
      {active === "query" && (
        <div className="section">

          <button className="back-btn" onClick={() => {
            setActive("");
            setQueries([]);
          }}>
            ⬅ Back
          </button>

          <h2>Your Legal Queries</h2>

          {loading && <p className="loading">Loading...</p>}

          <div className="result-grid">
            {queries.length > 0 ? (
              queries.map((item, index) => (
                <div className="result-card" key={index}>
                  <h3>📝 Legal Issue</h3>

                  <p><strong>Issue:</strong> {item.issue}</p>

                  {/* 🔥 NEW: SOLUTION SHOW */}
                  <p>
                    <strong>Solution:</strong>{" "}
                    {item.solution && item.solution !== "Pending"
                      ? item.solution
                      : "Pending ⏳"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("en-IN")
                      : "No Date"}
                  </p>
                </div>
              ))
            ) : (
              !loading && <p>No queries found</p>
            )}
          </div>

        </div>
      )}

      
{active === "appointment" && (
  <div className="section">

    <button className="back-btn" onClick={() => setActive("")}>
      ⬅ Back
    </button>

    <h2>Your Lawyer Appointments</h2>

    {(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

      // 🔥 FILTER USER DATA
      const myAppointments = allAppointments.filter(
        (a) => a.userName === user?.name
      );

      if (myAppointments.length === 0) {
        return <p>No appointments yet</p>;
      }

      return (
        <div className="result-grid">
          {myAppointments.map((a) => (
            <div className="result-card" key={a.id}>

              <h3>{a.lawyer}</h3>

              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.time}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span style={{
                  color:
                    a.status === "Approved"
                      ? "green"
                      : a.status === "Rejected"
                      ? "red"
                      : "orange"
                }}>
                  {a.status}
                </span>
              </p>

            </div>
          ))}
        </div>
      );
    })()}

  </div>
)}

    </div>
  );
}

export default UserDashboard;