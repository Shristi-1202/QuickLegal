import { useNavigate } from "react-router-dom";

function Resources() {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Legal Documents & Templates",
      desc: "Access ready-to-use affidavits, agreements, contracts, and other legal document formats.",
      icon: "📑",
      path: "/documents"
    },
    {
      title: "Government Courts & Links",
      desc: "Direct access to official court websites, e-filing portals, and legal government resources.",
      icon: "🏛️",
      path: "/courts"
    },
    {
      title: "Legal Blogs & Articles",
      desc: "Stay updated with latest legal insights, case studies, and law-related news.",
      icon: "📰",
      path: "/blogs"
    }
  ];

  return (
    <section id="resources" className="resources section-wrapper">
      <div className="container">
        <h2 className="section-title">Legal Resources</h2>

        <div className="resources-grid">
          {resources.map((item, index) => (
            <div key={index} className="resource-card">
              <div className="resource-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <button
                className="resource-btn"
                onClick={() => navigate(item.path)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resources;