import {
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import { phones } from "@/data/phones";
const Index = ({ cart }: { cart: CartFunctions }) => (
  <>
    <Header cart={cart} />
    <main className="store-shell">
      <Hero />
      <div className="value-strip">
        <span>
          <Smartphone size={19} />
          <strong>Your favorite brands.</strong> All in one place.
        </span>
        <span>
          <SlidersHorizontal size={19} />
          <strong>Find your fit.</strong> Explore your options.
        </span>
        <span>
          <Wallet size={19} />
          <strong>Big or small.</strong> A phone for your budget.
        </span>
      </div>
      <section className="brand-section">
        <div className="section-topline">
          <span className="eyebrow">PICK YOUR SIDE. OR TRY SOMETHING NEW.</span>
          <Link to="/shop" className="text-link">
            Shop by brand <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="brand-grid">
          {[
            {
              name: "Apple",
              word: "iPhone",
              text: "Beautifully familiar.",
              className: "apple-brand",
              icon: "◉",
            },
            {
              name: "Samsung",
              word: "SAMSUNG",
              text: "Open up your world.",
              className: "samsung-brand",
              icon: "S",
            },
            {
              name: "Xiaomi",
              word: "xiaomi",
              text: "A different perspective.",
              className: "xiaomi-brand",
              icon: "mi",
            },
            {
              name: "Redmi",
              word: "Redmi",
              text: "More of what matters.",
              className: "redmi-brand",
              icon: "R",
            },
          ].map((brand) => (
            <Link
              to={`/shop?brand=${brand.name}`}
              key={brand.name}
              className={`brand-card ${brand.className}`}
            >
              <div>
                <span className="brand-symbol">{brand.icon}</span>
                <ArrowUpRight size={17} />
              </div>
              <strong>{brand.word}</strong>
              <p>{brand.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE SHORTLIST</span>
            <h2>
              Worth the upgrade<span>.</span>
            </h2>
            <p>
              Different brands. Different possibilities. All great places to
              start.
            </p>
          </div>
          <Link to="/shop" className="text-link">
            View all phones <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="phone-grid">
          {phones.slice(0, 4).map((phone) => (
            <ProductCard key={phone.id} {...phone} cart={cart} />
          ))}
        </div>
      </section>
      <section className="discovery-banner">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> SMALL PRICE. BIG POSSIBILITIES.
          </span>
          <h2>
            Your everyday.
            <br />
            Upgraded.
          </h2>
          <p>
            Discover the Redmi collection. A fresh start
            <br />
            doesn’t have to cost the earth.
          </p>
          <Link to="/shop?brand=Redmi" className="store-button dark-button">
            Explore Redmi <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="discovery-art">
          <span>
            MAKE
            <br />
            IT YOURS.
          </span>
          <img
            src="/phones/redmi.svg"
            alt="Lavender Redmi phone illustration"
            loading="lazy"
          />
        </div>
      </section>
      <section className="help-section">
        <span className="help-icon">
          <Smartphone size={28} />
        </span>
        <div>
          <h2>A new phone is personal.</h2>
          <p>Find your brand, explore your options, and make it yours.</p>
        </div>
        <Link className="text-link" to="/contact">
          Let’s talk tech <ArrowRight size={18} />
        </Link>
      </section>
    </main>
    <Footer />
  </>
);
export default Index;
