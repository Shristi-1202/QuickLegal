import { useNavigate } from "react-router-dom";
function Hero() {
  return (
    <section className="hero">
      
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
      >
        <source src="/assets/WhatsApp Video 2025-07-17 at 10.45.46_45eb29ac.mp4" type="video/mp4" />
      </video>
    </section>
  );
}

export default Hero;
