import { useEffect, useState } from "react";

function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW STATE (IMPORTANT FIX)
  const [solutions, setSolutions] = useState({});

  // 🔥 FETCH QUERIES
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://quicklegal-vipi.onrender.com/api/query");
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      alert("Error fetching queries ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // 🔥 HANDLE REPLY
  const handleReply = async (id) => {
    const solutionText = solutions[id];

    if (!solutionText) {
      alert("Enter solution ❌");
      return;
    }

    try {
      await fetch(`https://quicklegal-vipi.onrender.com/api/query/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solution: solutionText }),
      });

      alert("Reply saved ✅");

      fetchQueries(); // refresh data
    } catch {
      alert("Error saving reply ❌");
    }
  };

  return (
    <div className="admin-container">

      <h2 className="admin-title">Legal Queries Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">

          {queries.length > 0 ? (
            queries.map((q) => (
              <div key={q._id} className="request-card">

                <h3>{q.name}</h3>

                <p><strong>Phone:</strong> {q.phone}</p>

                <p><strong>Type:</strong> {q.type}</p>

                <p><strong>Issue:</strong> {q.issue}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  {q.solution === "Pending"
                    ? "Pending ⏳"
                    : "Resolved ✅"}
                </p>

                {/* 🔥 FIXED INPUT */}
                <input
                  placeholder="Write solution..."
                  value={solutions[q._id] || ""}
                  onChange={(e) =>
                    setSolutions({
                      ...solutions,
                      [q._id]: e.target.value
                    })
                  }
                />

                {/* 🔥 FIXED BUTTON */}
                <button
                  className="approve"
                  onClick={() => handleReply(q._id)}
                >
                  Submit Reply
                </button>

              </div>
            ))
          ) : (
            <p>No queries found</p>
          )}

        </div>
      )}
    </div>
  );
}

export default AdminQueries;