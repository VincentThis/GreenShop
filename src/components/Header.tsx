import {
  ArrowUpRight,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartFunctions } from "@/contexts/CartContext";

interface HeaderProps {
  cart: CartFunctions;
  onSearch?: (query: string) => void;
  onCategoryFilter?: (brand: string) => void;
}
export const Header = ({ cart, onSearch }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const search = (event: React.FormEvent) => {
    event.preventDefault();
    if (!onSearch) navigate(`/shop?q=${encodeURIComponent(query)}`);
  };
  return (
    <>
      <div className="announcement">
        <span>A little upgrade. A whole new world.</span>
        <Link to="/shop">
          Find your next phone <ArrowUpRight size={13} />
        </Link>
      </div>
      <header className="store-header">
        <div className="store-shell header-inner">
          <Link to="/" className="wordmark" aria-label="Phonehaus home">
            <span className="logo-mark">
              p<span />
            </span>
            phonehaus<span className="logo-dot">.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/shop">All phones</Link>
            <Link to="/shop?brand=Apple">iPhone</Link>
            <Link to="/shop?brand=Samsung">Samsung</Link>
            <Link to="/shop?brand=Xiaomi">Xiaomi</Link>
            <Link to="/shop?brand=Redmi">Redmi</Link>
          </nav>
          <div className="header-actions">
            <form onSubmit={search} className="header-search">
              <Search size={16} />
              <input
                aria-label="Search phones"
                placeholder="Find your phone"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  onSearch?.(event.target.value);
                }}
              />
            </form>
            <Link
              className="icon-button account-link"
              to="/auth"
              aria-label="Your account"
            >
              <UserRound size={21} />
            </Link>
            <Link
              to="/cart"
              className="icon-button bag-link"
              aria-label={`Shopping bag, ${cart.getTotalItems()} items`}
            >
              <ShoppingBag size={21} />
              {cart.getTotalItems() > 0 && (
                <span className="bag-count">{cart.getTotalItems()}</span>
              )}
            </Link>
            <button
              className="icon-button mobile-menu-button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {["All", "Apple", "Samsung", "Xiaomi", "Redmi"].map((brand) => (
              <Link
                onClick={() => setMenuOpen(false)}
                key={brand}
                to={brand === "All" ? "/shop" : `/shop?brand=${brand}`}
              >
                {brand === "All" ? "All phones" : brand}
              </Link>
            ))}
            <Link to="/auth">Your account</Link>
            <Link to="/about">About Phonehaus</Link>
          </nav>
        )}
      </header>
    </>
  );
};
