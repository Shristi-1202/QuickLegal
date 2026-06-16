import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminQueries from "./pages/AdminQueries";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import LawyersHome from "./components/Lawyers";
import Resources from "./components/Resources";
import About from "./components/About";
import Footer from "./components/Footer";
import AdminAppointments from "./pages/AdminAppointments";

import LawyersPage from "./pages/Lawyers";
import Appointment from "./pages/Appointment";
import Welcome from "./pages/Welcome";
import Result from "./pages/Result";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";


import QueryForm from "./pages/QueryForm";
import AdminQuery from "./pages/AdminQuery";

import DocumentsPage from "./components/DocumentsPage";
import CourtsPage from "./components/CourtsPage";
import BlogsPage from "./components/BlogsPage";

import "./styles.css";



function Home() {
  return (
    <>
      <Hero />
      <Services />
      <LawyersHome />
      <Resources />
      <Features />
      <About />
      
    </>
  );
}

//  PROTECTED ROUTE
function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}

function App() {

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lawyers" element={<LawyersPage />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/search-results" element={<Result />} />

          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/courts" element={<CourtsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/query-form"
            element={
              <ProtectedRoute role="user">
                <QueryForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

       
          <Route
            path="/admin/notary"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/query"
            element={
              <ProtectedRoute role="admin">
                <AdminQuery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/queries"
            element={
              <ProtectedRoute role="admin">
                <AdminQueries />
              </ProtectedRoute>
            }
          />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;