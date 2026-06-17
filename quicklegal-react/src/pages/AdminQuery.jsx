import { useEffect, useState } from "react";

function AdminQuery() {

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ALL QUERIES
  const fetchQueries = async () => {
    try {
      const res = await fetch("https://quicklegal-vipi.onrender.com/api/query");
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // 🔥 HANDLE REPLY
  const handleReply = async (id, solution) => {
    if (!solution) {
      alert("Enter solution ❌");
      return;
    }

    try {
      await fetch(`https://quicklegal-vipi.onrender.com/api/query/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ solution })
      });

      alert("Reply sent ✅");
      fetchQueries(); // refresh

    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="admin-container">

      <h2 className="admin-title">Legal Queries</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">

          {queries.length > 0 ? (
            queries.map((q) => (
              <div className="request-card" key={q._id}>

                <h3>{q.name}</h3>

                <p><strong>Phone:</strong> {q.phone}</p>

                <p><strong>Type:</strong> {q.type}</p>

                <p><strong>Issue:</strong> {q.issue}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status">
                    {q.solution || "Pending"}
                  </span>
                </p>

                {/* 🔥 REPLY INPUT */}
                <input
                  type="text"
                  placeholder="Write solution..."
                  onChange={(e) => q.tempSolution = e.target.value}
                />

                <button
                  className="approve"
                  onClick={() => handleReply(q._id, q.tempSolution)}
                >
                  Send Reply
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

export default AdminQuery;