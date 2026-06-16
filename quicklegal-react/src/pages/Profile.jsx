import { useState, useEffect } from "react";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhaar: "",
    photo: null,
  });

  // ✅ Load data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
      }));
    }
  }, []);

  // ✅ Input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: URL.createObjectURL(file) });
    }
  };

  // ✅ Save
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    alert("Profile Saved ✅");
  };

  return (
    <div className="profile-container">

      {/* 🔥 WRAPPER ADD KIYA */}
      <div className="profile-wrapper">

        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">

          {/* IMAGE */}
          <div className="profile-image">
            {user.photo ? (
              <img src={user.photo} alt="profile" />
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>

          {/* INPUTS */}
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="aadhaar"
            value={user.aadhaar}
            onChange={handleChange}
            placeholder="Aadhaar Number"
          />

          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Address"
          />

          {/* FILE */}
          <input type="file" onChange={handleImage} />

          {/* BUTTON */}
          <button className="save-btn" onClick={handleSave}>
            💾 Save Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;