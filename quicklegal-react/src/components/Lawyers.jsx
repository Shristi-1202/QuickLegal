import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 ADD

function Lawyers() {
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // 🔥 ADD
  const scrollAmount = 340;

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    if (direction === "left") {
      sliderRef.current.scrollLeft -= scrollAmount;
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  const lawyers = [
    {
      name: "Awashni Pratap Singh",
      field: "Corporate Law",
      desc: "15+ years experience in corporate law and mergers & acquisitions.",
      img: "https://media.istockphoto.com/id/1316934378/photo/male-attorney-with-arms-crossed-lawyer.webp?a=1&b=1&s=612x612&w=0&k=20&c=mHD0UxVW7U35eUfUaPaqFJizSAz5KeVXPJX7pg1159g="
    },
    {
      name: "Michael Rodriguez",
      field: "Family Law",
      desc: "Specializes in divorce proceedings and child custody cases.",
      img: "https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=QJq9yzU_-JYdJFRmHiWs82RXLkFJinVey4Jkc4t84zc="
    },
    {
      name: "Vishnu Oberoi",
      field: "Immigration Law",
      desc: "Expert in visa applications and citizenship processes.",
      img: "https://media.istockphoto.com/id/104821116/photo/smiling-lawyer-sitting-at-desk-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=pX0my4XGHaa45o-K9zfwHH9BotIHXpA5CDw-6DdIUuA="
    },
    {
      name: "Kapil Rana",
      field: "Real Estate Law",
      desc: "Handles property disputes and transactions.",
      img: "https://plus.unsplash.com/premium_photo-1664298752878-f13307b9334b?w=600&auto=format&fit=crop&q=60"
    },
    {
      name: "Rahul Jain",
      field: "Criminal Law",
      desc: "Experienced in criminal defense and legal representation.",
      img: "https://images.unsplash.com/photo-1662104935883-e9dd0619eaba?w=600&auto=format&fit=crop&q=60"
    },
    {
      name: "Priya Singhania",
      field: "Business Law",
      desc: "Specialist in startup advisory and compliance.",
      img: "https://images.unsplash.com/photo-1659353220638-77e701cd088f?w=600&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section id="lawyers" className="lawyers section-wrapper">
      <div className="container">
        <h2 className="section-title">Featured Lawyers</h2>

        <div className="slider-container">
          <button className="slider-btn prev-btn" onClick={() => scroll("left")}>
            &#10094;
          </button>

          <div ref={sliderRef} className="lawyers-track">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="lawyer-card">
                <img src={lawyer.img} alt={lawyer.name} className="lawyer-img" />
                <h3>{lawyer.name}</h3>
                <p className="lawyer-specialty">{lawyer.field}</p>
                <div className="rating">★★★★★</div>
                <p>{lawyer.desc}</p>

                {/* 🔥 UPDATED BUTTON */}
                <button
                  className="btn"
                  onClick={() => navigate("/lawyers")}
                >
                  Contact
                </button>

              </div>
            ))}
          </div>

          <button className="slider-btn next-btn" onClick={() => scroll("right")}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Lawyers;