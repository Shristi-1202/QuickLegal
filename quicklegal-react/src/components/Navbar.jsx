import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import logo from "../assets/QuickLegalLogo.png";

function Navbar() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const logged = localStorage.getItem("isLoggedIn");
    setUser(storedUser || null);
    setIsLoggedIn(logged === "true");
  }, []);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (window.google && window.google.search) {
      window.google.search.cse.element.go();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServicesClick = () => {
    if (window.location.pathname === "/") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleResourcesClick = () => {
    if (window.location.pathname === "/") {
      document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" className="logo-link">
            <img src={logo} alt="logo" className="nav-logo" />
            <h2 className="brand-name">
              <span className="quick">Quick</span>
              <span className="legal">Legal</span>
            </h2>
          </Link>

          {/* SEARCH */}
          <div className="nav-search">
            <div
              className="gcse-searchbox-only"
              data-resultsurl="/search-results"
              data-newwindow="false"
              data-queryparametername="search"
            ></div>
          </div>

          {/* NAV LINKS */}
          <ul className="nav-links">
            <li onClick={handleServicesClick}>Services</li>
            <li><Link to="/lawyers">Lawyers</Link></li>
            <li onClick={handleResourcesClick}>Resources</li>

            {!user || !isLoggedIn ? (
              <>
                <li onClick={() => setShowLogin(true)}>Login</li>
                <li onClick={() => setShowSignup(true)}>Sign Up</li>
              </>
            ) : (
              <li ref={menuRef} className="avatar-wrapper">
                <div className="avatar" onClick={() => setOpen(!open)}>
                  {initial}
                </div>

                {open && (
                  <div className="dropdown">
                    {user.role === "user" && (
                      <p onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}>
                        👤 My Profile
                      </p>
                    )}

                    <p onClick={() => {
                      navigate(isAdmin ? "/admin-dashboard" : "/dashboard");
                      setOpen(false);
                    }}>
                      📊 Dashboard
                    </p>

                    <div className="divider-line"></div>

                    <p onClick={handleLogout} className="logout">
                      🚪 Logout
                    </p>
                  </div>
                )}
              </li>
            )}
          </ul>

        </div>
      </nav>

      {showSignup && <SignupModal close={() => setShowSignup(false)} />}
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </>
  );
}

export default Navbar;