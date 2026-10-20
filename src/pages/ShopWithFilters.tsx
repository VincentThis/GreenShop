import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import { brands, phones } from "@/data/phones";
const ShopWithFilters = ({ cart }: { cart: CartFunctions }) => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const requestedBrand = params.get("brand") || "All";
  const brand = brands.includes(requestedBrand as (typeof brands)[number])
    ? requestedBrand
    : "All";
  const sort = params.get("sort") || "featured";
  const budget = params.get("budget") || "all";
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (
          !value ||
          value === "All" ||
          value === "all" ||
          value === "featured"
        )
          next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  const products = phones
    .filter(
      (phone) =>
        (brand === "All" || phone.category === brand) &&
        `${phone.name} ${phone.category} ${phone.storage}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (budget === "all" || phone.price <= Number(budget)),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : a.id - b.id,
    );
  return (
    <>
      <Header cart={cart} />
      <main className="store-shell shop-page">
        <span className="eyebrow">FIND YOUR NEXT DAILY COMPANION</span>
        <h1>
          {brand === "All" ? "All phones" : brand}
          <span>.</span>
        </h1>
        <p className="page-intro">
          Your world, in your pocket. Let’s find your perfect fit.
        </p>
        <div className="shop-controls">
          <div className="brand-tabs" role="group" aria-label="Filter by brand">
            {brands.map((item) => (
              <button
                key={item}
                aria-pressed={brand === item}
                className={brand === item ? "selected" : ""}
                onClick={() => update("brand", item)}
              >
                {item === "All" ? "All brands" : item}
              </button>
            ))}
          </div>
          <label className="sort-control">
            <SlidersHorizontal size={16} />
            <span className="sr-only">Sort by</span>
            <select
              aria-label="Sort phones"
              value={sort}
              onChange={(event) => update("sort", event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="catalogue-tools">
          <span>{products.length} phones to explore</span>
          <label className="catalogue-search">
            <Search size={17} />
            <input
              aria-label="Search catalogue"
              value={query}
              placeholder="Search by model or brand"
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <label>
            Budget{" "}
            <select
              aria-label="Maximum budget"
              value={budget}
              onChange={(event) => update("budget", event.target.value)}
            >
              <option value="all">Any price</option>
              <option value="20000">Under ₱20,000</option>
              <option value="40000">Under ₱40,000</option>
              <option value="60000">Under ₱60,000</option>
            </select>
          </label>
        </div>
        {products.length ? (
          <div className="phone-grid">
            {products.map((phone) => (
              <ProductCard key={phone.id} {...phone} cart={cart} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <Search size={32} />
            <h2>No matches just yet.</h2>
            <p>Try another model, brand, or budget.</p>
            <button
              className="store-button dark-button"
              onClick={() => setParams({})}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
export default ShopWithFilters;
