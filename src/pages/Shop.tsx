import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { CartFunctions } from "@/contexts/CartContext";

const Shop = ({ cart }: { cart: CartFunctions }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Shop All Products</h1>
        <ProductGrid cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
