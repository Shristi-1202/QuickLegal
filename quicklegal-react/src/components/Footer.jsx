import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("Enter valid email ❌");
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

    if (subscribers.includes(email)) {
      setMessage("Already subscribed ⚠️");
      return;
    }

    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    setMessage("Subscribed successfully ✅");
    setEmail("");
  };

  //  SCROLL FUNCTION (React Router fix)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* Column 1 */}
        <div className="footer-column">
          <h2 className="footer-logo">QuickLegal</h2>
          <p>
            Simplifying legal services by connecting you with trusted lawyers,
            legal documents, and government resources.
          </p>

          <div className="social-links">
            <a href="#"><i>FB</i></a>
            <a href="#"><i>TW</i></a>
            <a href="#"><i>IG</i></a>
            <a href="#"><i>LI</i></a>
          </div>
        </div>

        {/* Column 2 – UPDATED */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <button onClick={() => scrollToSection("services")}>
                Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("lawyers")}>
                Lawyers
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("resources")}>
                Resources
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>📍 New Delhi, India</li>
            <li>📞 +91 9876543210</li>
            <li>✉ info@quicklegal.com</li>
            <li>🕒 Mon–Fri: 9am–6pm</li>
          </ul>
        </div>

        {/* Column 4 – Newsletter */}
        <div className="footer-column">
          <h3>Subscribe</h3>
          <p>Get legal updates and news directly in your inbox.</p>

          <form className="newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>

          {message && <p className="subscribe-msg">{message}</p>}
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} QuickLegal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;