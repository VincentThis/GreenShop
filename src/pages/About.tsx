import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Smartphone,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartFunctions } from "@/contexts/CartContext";
const About = ({ cart }: { cart: CartFunctions }) => (
  <>
    <Header cart={cart} />
    <main className="store-shell content-page">
      <span className="eyebrow">HELLO, WE’RE PHONEHAUS</span>
      <h1>
        Good tech.
        <br />
        Better connections<span className="logo-dot">.</span>
      </h1>
      <p className="content-lead">
        Your phone holds a little bit of your whole world. We’re making it
        easier to explore your next one, with Apple, Samsung, Xiaomi, and Redmi
        under one roof.
      </p>
      <Link className="store-button dark-button" to="/shop">
        Find your next phone <ArrowUpRight size={17} />
      </Link>
      <div className="about-grid">
        <div>
          <Smartphone />
          <h2>Pick your favorite.</h2>
          <p>
            Stay with the brand you love, or discover a different perspective.
            Browse all four brands in one simple catalogue.
          </p>
        </div>
        <div>
          <SlidersHorizontal />
          <h2>Make it personal.</h2>
          <p>
            Search by model, filter by brand and budget, and take a closer look
            at the finish and storage of each phone.
          </p>
        </div>
        <div>
          <Wallet />
          <h2>Find your balance.</h2>
          <p>
            From everyday essentials to flagship designs, explore a range of
            illustrative prices to find your starting point.
          </p>
        </div>
      </div>
      <p className="preview-notice">
        Phonehaus is a software engineering course project. The catalogue,
        prices, and product illustrations are for demonstration. We are an
        independent concept store, with no affiliation to the brands shown.
      </p>
    </main>
    <Footer />
  </>
);
export default About;
