import React from "react";

const blogsData = [
  {
    title: "What is FIR and How to File It?",
    description: "Learn the process of filing an FIR and your legal rights.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
  {
    title: "Understanding Consumer Rights",
    description: "Know your rights as a consumer in India.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
  {
    title: "Divorce Laws in India",
    description: "Step-by-step guide to divorce process and legal aspects.",
    image: "https://plus.unsplash.com/premium_photo-1681488254225-ce8a642c9fe1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGl2b3JjZSUyMGxhd3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Property Registration Process",
    description: "Everything about property registration and documentation.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    title: "Cyber Crime Laws in India",
    description: "How to stay safe online and legal actions against cyber crime.",
    image: "https://images.unsplash.com/photo-1510511233900-1982d92bd835",
  },
  {
    title: "Right to Information (RTI)",
    description: "How to file RTI and access government information.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  },
  {
    title: "Property Dispute Laws",
    description: "Understand legal remedies for property disputes.",
    image: "https://images.unsplash.com/photo-1560448075-bb485b067938",
  },
  {
    title: "Labour Laws in India",
    description: "Know your rights as an employee.",
    image: "https://images.unsplash.com/photo-1638771105700-8e72df39113a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFib3VyJTIwbGF3c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const BlogsPage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0c3fc, #f9c5d1)",
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Legal Blogs & Articles</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          marginTop: "40px",
        }}
      >
        {blogsData.map((blog, index) => (
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
              src={blog.image}
              alt="blog"
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            />

            {/* Title */}
            <h3 style={{ fontSize: "18px" }}>{blog.title}</h3>

            {/* Description */}
            <p style={{ color: "#666", fontSize: "14px" }}>
              {blog.description}
            </p>

            {/* Button */}
            <button
              style={{
                width: "100%",
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
              Read Article
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;