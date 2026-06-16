import { useState } from "react";

function NotaryModal({ close }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    docType: "",
    pages: "",
    document: null,
    idType: "",
    idProof: null,
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    await fetch("http://localhost:5000/api/notary", {
      method: "POST",
      body: data,
    });

    alert("Request submitted ✅");
    close();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        
        
        <button style={closeBtn} onClick={close}>✖</button>

        <h2 style={heading}>Online Notary Request</h2>

        <form onSubmit={handleSubmit}>

          
          <h4 style={sectionTitle}>Personal Details</h4>

          <input name="name" placeholder="Full Name" onChange={handleChange} required style={input} />
          <input name="email" placeholder="Email" onChange={handleChange} required style={input} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={input} />

          
          <h4 style={sectionTitle}>Document Details</h4>

          <select name="docType" onChange={handleChange} required style={input}>
            <option value="">Select Document Type</option>
            <option>Affidavit</option>
            <option>Agreement</option>
            <option>Name Change</option>
          </select>

          <input name="pages" placeholder="Number of Pages" onChange={handleChange} style={input} />

          <input type="file" name="document" onChange={handleChange} required style={input} />

          
          <h4 style={sectionTitle}>ID Verification</h4>

          <select name="idType" onChange={handleChange} style={input}>
            <option value="">Select ID</option>
            <option>Aadhaar</option>
            <option>PAN</option>
          </select>

          <input type="file" name="idProof" onChange={handleChange} style={input} />

         
          <h4 style={sectionTitle}>Delivery Address</h4>

          <input name="address" placeholder="Full Address" onChange={handleChange} style={input} />
          <input name="city" placeholder="City" onChange={handleChange} style={input} />
          <input name="state" placeholder="State" onChange={handleChange} style={input} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} style={input} />

          
          <button type="submit" style={submitBtn}>
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );
}

export default NotaryModal;



// 🎨 STYLES

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  zIndex: 9999
};

const modal = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative"
};

const heading = {
  textAlign: "center",
  marginBottom: "15px"
};

const sectionTitle = {
  marginTop: "15px",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#555"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "12px",
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer"
};