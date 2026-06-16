import { useState, useEffect } from "react";

function QueryForm() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    issue: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.type || !form.issue) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert("Query submitted ✅");
        setForm({ name: "", phone: "", type: "", issue: "" });
      }

    } catch {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-page">
      <h2>Submit Legal Query</h2>

      <form onSubmit={handleSubmit} className="query-form">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Select Query Type</option>
          <option>Notary</option>
          <option>Legal Documents</option>
          <option>Lawyer Appointment</option>
        </select>

        <textarea
          name="issue"
          value={form.issue}
          onChange={handleChange}
          placeholder="Write your legal query..."
        />

        <button>
          {loading ? "Submitting..." : "Submit Query"}
        </button>

      </form>
    </div>
  );
}

export default QueryForm;