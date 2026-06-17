import { useEffect, useState } from "react";
import "./admin.css";

function Admin() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://quicklegal-vipi.onrender.com/api/notary");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    await fetch(`https://quicklegal-vipi.onrender.com/api/notary/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // 🔥 STATUS UPDATE
  const handleStatus = async (id, newStatus) => {
    await fetch(`https://quicklegal-vipi.onrender.com/api/notary/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchData();
  };

  // 🔍 FILTER
  const filtered = requests.filter((req) =>
    req.name?.toLowerCase().includes(search.toLowerCase()) ||
    req.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 STATS
  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const approved = requests.filter(r => r.status === "Approved").length;
  const rejected = requests.filter(r => r.status === "Rejected").length;

  return (
    <div className="admin-container">

      {/* 🔥 CENTER TITLE ONLY */}
      <h2 className="admin-title center-title">
        Notary Requests Management
      </h2>

      {/* 📊 STATS */}
      <div className="stats">
        <div className="stat-card">Total<br/><span>{total}</span></div>
        <div className="stat-card pending">Pending<br/><span>{pending}</span></div>
        <div className="stat-card approved">Approved<br/><span>{approved}</span></div>
        <div className="stat-card rejected">Rejected<br/><span>{rejected}</span></div>
      </div>

      {/* 🔍 SEARCH */}
      <input
        className="search-box"
        placeholder="🔍 Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔄 LOADING */}
      {loading ? (
        <p className="loading">Loading requests...</p>
      ) : (
        <div className="card-container">

          {filtered.length > 0 ? (
            filtered.map((req) => (
              <div className="request-card" key={req._id}>

                <h3>{req.name}</h3>

                <p><strong>Email:</strong> {req.email}</p>

                <p>
                  <strong>Document:</strong>{" "}
                  <a
                    href={`https://quicklegal-vipi.onrender.com/uploads/${req.document}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View File
                  </a>
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {req.createdAt
                    ? new Date(req.createdAt).toLocaleString("en-IN")
                    : "No Date"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${req.status}`}>
                    {req.status || "Pending"}
                  </span>
                </p>

                {/* 🔥 ACTION BUTTONS */}
                <div className="status-buttons">

                  <button
                    className="approve"
                    onClick={() => handleStatus(req._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() => handleStatus(req._id, "Rejected")}
                  >
                    Reject
                  </button>

                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(req._id)}
                >
                  Delete
                </button>

              </div>
            ))
          ) : (
            <p className="no-data">No requests found</p>
          )}

        </div>
      )}
    </div>
  );
}

export default Admin;