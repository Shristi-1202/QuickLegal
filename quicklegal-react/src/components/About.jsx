import React, { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="about section-wrapper">
      {/* Floating Shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>

      <div className="about-container">
        {/* Image Section */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/assets/about.png" alt="Legal Team" />
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>About QuickLegal</h2>

          <p>
            QuickLegal is a next-generation legal platform designed to connect
            clients with trusted legal professionals. We combine transparency,
            security, and innovation to simplify legal services.
          </p>

          <div className="about-highlights">
            <div className="highlight-card">
              <h3>
                <CountUp end={500} duration={3} />+
              </h3>
              <p>Verified Lawyers</p>
            </div>

            <div className="highlight-card">
              <h3>
                <CountUp end={10000} duration={3} separator="," />+
              </h3>
              <p>Cases Handled</p>
            </div>

            <div className="highlight-card">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>

          <button
            className="about-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Learn More"}
          </button>

          {showMore && (
            <motion.div
              className="about-details"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Why Choose QuickLegal?</h3>

              <p>
                QuickLegal is an all-in-one legal assistance platform that
                simplifies legal services for individuals, startups, and
                businesses. Our platform helps users connect with verified
                lawyers, access legal documents, explore government resources,
                and receive AI-powered legal guidance from anywhere.
              </p>

              <div className="details-cards">
                <div className="detail-card">
                  <h4>⚖️ Verified Lawyers</h4>
                  <p>
                    Access a network of trusted legal professionals across
                    multiple practice areas.
                  </p>
                </div>

                <div className="detail-card">
                  <h4>📄 Legal Documents</h4>
                  <p>
                    Generate, download, and manage important legal documents
                    quickly and securely.
                  </p>
                </div>

                <div className="detail-card">
                  <h4>🤖 AI Legal Assistant</h4>
                  <p>
                    Get instant answers to basic legal questions with our
                    AI-powered assistant.
                  </p>
                </div>

                <div className="detail-card">
                  <h4>🏛 Government Resources</h4>
                  <p>
                    Explore government schemes, portals, and legal resources in
                    one place.
                  </p>
                </div>

                <div className="detail-card">
                  <h4>🔒 Secure & Private</h4>
                  <p>
                    Your personal and legal information remains protected with
                    advanced security measures.
                  </p>
                </div>

                <div className="detail-card">
                  <h4>📞 24/7 Support</h4>
                  <p>
                    Get assistance anytime through our dedicated support
                    channels.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default About;