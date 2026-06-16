function Features() {
  const features = [
    {
      title: "Verified Professionals",
      icon: "✔️",
      desc: "All lawyers and notaries are thoroughly vetted and certified with background checks."
    },
    {
      title: "Wide Legal Coverage",
      icon: "⚖️",
      desc: "Access professionals specializing in all major legal fields and jurisdictions."
    },
    {
      title: "Secure & Confidential",
      icon: "🔒",
      desc: "Your information remains private with strict confidentiality protocols."
    },
    {
      title: "Transparent Pricing",
      icon: "💸",
      desc: "No hidden fees with upfront pricing for all services."
    }
  ];

  return (
    <section id="features" className="features section-wrapper">
      <div className="container">
        <h2 className="section-title">Why Choose QuickLegal</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
