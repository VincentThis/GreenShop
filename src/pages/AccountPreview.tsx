import { Link } from "react-router-dom";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartFunctions } from "@/contexts/CartContext";
export const AccountPreview = ({ cart }: { cart: CartFunctions }) => (
  <>
    <Header cart={cart} />
    <main className="store-shell content-page">
      <div className="account-preview">
        <UserRound size={35} strokeWidth={1.4} />
        <span className="eyebrow" style={{ display: "block", marginTop: 24 }}>
          A NEW CONNECTION IS ON ITS WAY
        </span>
        <h1>Your next chapter starts here.</h1>
        <p>
          Accounts and ordering will open when our new store backend is ready.
          In the meantime, explore the phones and save your favorites to your
          bag.
        </p>
        <Link to="/shop" className="store-button dark-button">
          Explore the collection <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
    <Footer />
  </>
);
