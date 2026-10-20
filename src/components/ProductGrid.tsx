import { ProductCard } from "./ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import { phones } from "@/data/phones";
export const FilterableProductGrid = ({
  cart,
  searchQuery = "",
  categoryFilter = "All",
}: {
  cart: CartFunctions;
  searchQuery?: string;
  categoryFilter?: string;
}) => {
  const products = phones.filter(
    (phone) =>
      `${phone.name} ${phone.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "All" || categoryFilter === phone.category),
  );
  return products.length ? (
    <div className="phone-grid">
      {products.map((phone) => (
        <ProductCard key={phone.id} {...phone} cart={cart} />
      ))}
    </div>
  ) : (
    <div className="empty-results">
      <h3>No phones found.</h3>
      <p>Try a different brand or search term.</p>
    </div>
  );
};
