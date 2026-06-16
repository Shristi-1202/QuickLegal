import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotaryModal from "./modals/NotaryModal";

function Services() {
  const [showNotary, setShowNotary] = useState(false);
  const navigate = useNavigate();

  // LOGIN CHECK FUNCTION
  const checkLogin = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login first ❌");
      return false;
    }

    return true;
  };

  //  ONLY 2 SERVICES NOW
  const services = [
    {
      title: "Online Notary",
      desc: "Get your documents notarized quickly and securely.",
      img: "/assets/service1.png",
      action: () => {
        if (checkLogin()) setShowNotary(true);
      },
      btn: "Request Notary",
    },
    {
      title: "Submit Legal Query",
      desc: "Describe your legal issue and get guidance.",
      img: "/assets/service2.png",
      action: () => {
        if (checkLogin()) {
          navigate("/query-form");
        }
      },
      btn: "Submit Query",
    },
  ];

  return (
    <section id="services" className="services section-wrapper">
      <div className="container">
        <h2 className="section-title">Our Services</h2>

        {/* GRID */}
        <div className="services-grid centered">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <img src={service.img} alt={service.title} />

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                <button className="btn" onClick={service.action}>
                  {service.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTARY MODAL */}
      {showNotary && (
        <NotaryModal close={() => setShowNotary(false)} />
      )}
    </section>
  );
}

export default Services;