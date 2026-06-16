import React, { useState } from "react";

const courtsData = [
  {
    name: "Supreme Court of India",
    state: "All",
    category: "Supreme Court",
    link: "https://main.sci.gov.in/",
    description: "Highest judicial authority of India",
  },
  {
    name: "Allahabad High Court",
    state: "Uttar Pradesh",
    category: "High Court",
    link: "https://www.allahabadhighcourt.in/",
    description: "High Court of Uttar Pradesh",
  },
  {
    name: "Delhi High Court",
    state: "Delhi",
    category: "High Court",
    link: "https://delhihighcourt.nic.in/",
    description: "High Court of Delhi",
  },
  {
    name: "Bombay High Court",
    state: "Maharashtra",
    category: "High Court",
    link: "https://bombayhighcourt.nic.in/",
    description: "High Court of Maharashtra",
  },
  {
    name: "Madras High Court",
    state: "Tamil Nadu",
    category: "High Court",
    link: "https://www.hcmadras.tn.nic.in/",
    description: "High Court of Tamil Nadu",
  },
  {
    name: "Calcutta High Court",
    state: "West Bengal",
    category: "High Court",
    link: "https://www.calcuttahighcourt.gov.in/",
    description: "High Court of West Bengal",
  },
  {
    name: "Karnataka High Court",
    state: "Karnataka",
    category: "High Court",
    link: "https://karnatakajudiciary.kar.nic.in/",
    description: "High Court of Karnataka",
  },
  {
    name: "Kerala High Court",
    state: "Kerala",
    category: "High Court",
    link: "https://hckerala.gov.in/",
    description: "High Court of Kerala",
  },
  {
    name: "Rajasthan High Court",
    state: "Rajasthan",
    category: "High Court",
    link: "https://hcraj.nic.in/",
    description: "High Court of Rajasthan",
  },
  {
    name: "Punjab & Haryana High Court",
    state: "Punjab",
    category: "High Court",
    link: "https://highcourtchd.gov.in/",
    description: "High Court of Punjab & Haryana",
  },
  {
    name: "eCourts Portal",
    state: "All",
    category: "Portal",
    link: "https://ecourts.gov.in/",
    description: "Online court services & case tracking",
  },
  {
    name: "National Consumer Disputes Redressal Commission",
    state: "All",
    category: "Tribunal",
    link: "https://ncdrc.nic.in/",
    description: "Consumer dispute tribunal",
  },
];

const statesList = [
  "All States",
  "Delhi",
  "Uttar Pradesh",
  "Maharashtra",
  "Tamil Nadu",
  "West Bengal",
  "Karnataka",
  "Kerala",
  "Rajasthan",
  "Punjab",
];

const categories = [
  "All",
  "Supreme Court",
  "High Court",
  "Portal",
  "Tribunal",
];

// Images
const getImage = (category) => {
  if (category === "Supreme Court")
    return "https://plus.unsplash.com/premium_photo-1694475304554-41b19fbe09c0?w=600&auto=format&fit=crop&q=60";
  if (category === "High Court")
    return "https://images.unsplash.com/photo-1720506997978-4d6f5ecb1f4f?w=600&auto=format&fit=crop&q=60";
  if (category === "Portal")
    return "https://plus.unsplash.com/premium_photo-1765128778450-f7a7bb54648c?w=600&auto=format&fit=crop&q=60";
  if (category === "Tribunal")
    return "https://plus.unsplash.com/premium_photo-1661342406509-064b58299ca5?w=600&auto=format&fit=crop&q=60";
};

const CourtsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourts = courtsData.filter((court) => {
    return (
      (selectedState === "All States" ||
        court.state === selectedState ||
        court.state === "All") &&
      (selectedCategory === "All" ||
        court.category === selectedCategory) &&
      court.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0c3fc, #f9c5d1)",
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Government Courts & Links</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search court..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "20px",
          borderRadius: "8px",
        }}
      />

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index}>{cat}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedState(e.target.value)}>
          {statesList.map((state, index) => (
            <option key={index}>{state}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          marginTop: "40px",
        }}
      >
        {filteredCourts.map((court, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "18px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Image */}
            <img
              src={getImage(court.category)}
              alt="court"
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover", // ✅ FIX
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            />

            <h3 style={{ fontSize: "18px" }}>{court.name}</h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {court.description}
            </p>

            {/* Button FULL WIDTH */}
            <button
              onClick={() => window.open(court.link, "_blank")}
              style={{
                width: "100%", // ✅ FIX
                background: "#e63946",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                marginTop: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Visit Website
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtsPage;