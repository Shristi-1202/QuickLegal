import { useState } from "react";

function QueryModal({ close }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
    alert("Query submitted successfully!");
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Submit Legal Query</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

          <select name="category" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Property">Property</option>
            <option value="Criminal">Criminal</option>
            <option value="Family">Family</option>
          </select>

          <textarea
            name="message"
            placeholder="Describe your issue..."
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>

        <button className="close-btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export default QueryModal;