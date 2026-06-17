import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function QueryModal({ close }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        issue: ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.issue.trim()) {
      alert("Enter your issue ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://quicklegal-vipi.onrender.com/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert("Query submitted ✅");
        close();
      }

    } catch {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      onClick={close}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          width: "400px",
          maxWidth: "90%",
          zIndex: 1000000
        }}
      >
        <h2>Submit Legal Query</h2>

        <form onSubmit={handleSubmit}>

          <input value={form.name} readOnly />
          <input value={form.email} readOnly />

          <textarea
            name="issue"
            placeholder="Describe your issue..."
            value={form.issue}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>

        <button onClick={close}>Cancel</button>

      </div>
    </div>,
    document.body
  );
}

export default QueryModal;