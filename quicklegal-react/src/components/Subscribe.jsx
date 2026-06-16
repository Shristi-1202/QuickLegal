import { useState } from "react";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Enter valid email ❌");
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    setMessage("Subscribed successfully ✅");
    setEmail("");
  };

  return (
    <div className="subscribe-section">
      <h2>Subscribe</h2>
      <p>Get legal updates and news directly in your inbox.</p>

      <form onSubmit={handleSubscribe} className="subscribe-box">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Subscribe</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Subscribe;