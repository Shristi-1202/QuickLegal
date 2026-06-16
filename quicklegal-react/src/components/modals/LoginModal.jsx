import { useState, useEffect } from "react";

function LoginModal({ close }) {

  const [form, setForm] = useState({
    name: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

 
  const generateCaptcha = () => {
    const chars = "ABCDEFGH123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const foundUser = users.find(
      (u) =>
        u.name.trim().toLowerCase() ===
        form.name.trim().toLowerCase()
    );

    if (!foundUser) {
      alert("User not found ❌");
      return;
    }

    
    if (userCaptcha !== captcha) {
      alert("Invalid captcha ❌");
      generateCaptcha();
      return;
    }

    alert("Login successful ✅");

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(foundUser));

    close();
    window.location.reload();
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">

        <h2>Login</h2>

        <form onSubmit={handleLogin} className="auth-form">

          
          <input
            name="name"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          
          <div className="captcha-box">
            <span>{captcha}</span>
            <button type="button" onClick={generateCaptcha}>↻</button>
          </div>

          <input
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
            required
          />

          <button className="primary-btn">Login</button>

        </form>

        <button onClick={close} className="cancel-btn">
          Cancel
        </button>

      </div>
    </div>
  );
}

export default LoginModal;