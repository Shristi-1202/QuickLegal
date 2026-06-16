import { useState, useEffect } from "react";

function SignupModal({ close }) {

  const [step, setStep] = useState("phone");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "user",
  });

  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // CAPTCHA
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

  // SAVE USER 
  const saveUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //ADMIN RESTRICTION
    if (form.role === "admin") {

      if (form.name.trim().toLowerCase() !== "shristi chaurasiya") {
        alert("Only Shristi Chaurasiya can be admin ❌");
        return false;
      }

      const adminExists = users.find((u) => u.role === "admin");

      if (adminExists) {
        alert("Admin already exists ❌");
        return false;
      }
    }

    //  DUPLICATE CHECK (IMPORTANT FIX)
    const exists = users.find(
      (u) =>
        u.name.toLowerCase() === form.name.toLowerCase() &&
        u.password === form.password
    );

    if (exists) {
      alert("User already exists ❌");
      return false;
    }

    //  SAVE USER
    const newUser = {
      name: form.name.trim(),
      phone: form.phone,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    //  AUTO LOGIN AFTER SIGNUP
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");

    return true;
  };

  //  PHONE SIGNUP 
  const handlePhoneSignup = (e) => {
    e.preventDefault();

    if (userCaptcha !== captcha) {
      alert("Invalid Captcha ❌");
      generateCaptcha();
      return;
    }

    const success = saveUser();
    if (!success) return;

    alert("Signup successful ✅");

    close();
    window.location.reload();
  };

  //  OTP 
  const sendOtp = async () => {
    if (!form.email) {
      alert("Enter email first ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP sent 📩");
        setIsOtpSent(true);
      } else {
        alert("Failed ❌");
      }
    } catch {
      alert("Server error ❌");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: otp.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {

        const success = saveUser();
        if (!success) return;

        alert("Signup successful ✅");

        close();
        window.location.reload();
      } else {
        alert("Invalid OTP ❌");
      }
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div
      className="signup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="signup-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2>Create Account</h2>

        {step === "phone" && (
          <form onSubmit={handlePhoneSignup} className="auth-form">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="captcha-box">
              <span>{captcha}</span>
              <button type="button" onClick={generateCaptcha}>↻</button>
            </div>

            <input
              placeholder="Enter Captcha"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
            />

            <button type="submit" className="signup-btn">
              👤 Sign Up
            </button>

            <div className="divider"><span>OR</span></div>

            <button
              type="button"
              className="email-btn"
              onClick={() => setStep("email")}
            >
              📧 Continue with Email
            </button>

            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>

          </form>
        )}

        {step === "email" && (
          <div className="auth-form">

            <input
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
            />

            {!isOtpSent ? (
              <button onClick={sendOtp}>Send OTP</button>
            ) : (
              <>
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOtp}>Verify OTP</button>
              </>
            )}

            <button onClick={() => setStep("phone")}>Back</button>
            <button onClick={close}>Cancel</button>

          </div>
        )}

      </div>
    </div>
  );
}

export default SignupModal;