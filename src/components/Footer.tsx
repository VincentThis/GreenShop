import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => (
  <footer className="store-footer">
    <div className="store-shell footer-top">
      <div>
        <Link className="wordmark" to="/">
          phonehaus<span className="logo-dot">.</span>
        </Link>
        <p>Good tech. Better connections.</p>
      </div>
      <div className="footer-links">
        <Link to="/shop">
          Explore phones <ArrowUpRight size={15} />
        </Link>
        <Link to="/about">Our story</Link>
        <Link to="/contact">Get in touch</Link>
      </div>
    </div>
    <div className="store-shell footer-bottom">
      <span>
        © {new Date().getFullYear()} Phonehaus. A student concept store.
      </span>
      <span>
        Sample prices & inventory · Product illustrations · No payments
        processed
      </span>
    </div>
  </footer>
);
