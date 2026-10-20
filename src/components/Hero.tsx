import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export const Hero = () => (
  <section className="hero-panel">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <span className="eyebrow">
        <span className="status-dot" /> YOUR NEXT UPGRADE STARTS HERE
      </span>
      <h1>
        Big on possibility.
        <br />
        <span>Made for you.</span>
      </h1>
      <p>
        From the everyday essentials to the all-out flagships.
        <br className="desktop-break" /> Find the phone that feels like you.
      </p>
      <div className="hero-buttons">
        <Link to="/shop" className="store-button lime-button">
          Explore all phones <ArrowUpRight size={18} />
        </Link>
        <Link to="/product/101" className="hero-text-link">
          Meet iPhone 16 Pro <ArrowRight size={16} />
        </Link>
      </div>
      <div className="hero-bottom">
        <span>APPLE</span>
        <span>SAMSUNG</span>
        <span>xiaomi</span>
        <span>Redmi</span>
      </div>
    </div>
    <div
      className="hero-art"
      aria-label="Illustrations of titanium iPhone and Samsung phones"
    >
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <span className="hero-art-label">A BETTER KIND OF CONNECTION</span>
      <img
        className="hero-phone hero-phone-back"
        src="/phones/galaxy-ultra.svg"
        alt="Samsung Galaxy phone illustration"
      />
      <img
        className="hero-phone hero-phone-front"
        src="/phones/iphone-pro.svg"
        alt="iPhone Pro illustration"
      />
      <div className="hero-product-note">
        <span className="status-dot" />
        <div>
          <strong>A new perspective.</strong>
          <small>Discover your next daily companion</small>
        </div>
        <ArrowUpRight size={20} />
      </div>
      <span className="hero-edition">THE UPGRADE EDIT / 01</span>
    </div>
  </section>
);
