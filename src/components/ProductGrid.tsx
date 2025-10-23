import { ProductCard } from "./ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const products = [
  { id: 1, name: "Chef J's Knife", price: 150, image: product5, category: "Kitchen" },
  { id: 2, name: "Raven's Sofa", price: 180, image: product6, category: "Home Decor" },
  { id: 3, name: "Jewelry Box", price: 100, image: product7, category: "Storage" },
  { id: 4, name: "Mond's AAPE", price: 300, image: product8, category: "Textiles" },
];

export const ProductGrid = ({ cart }: { cart: CartFunctions }) => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked sustainable essentials for your mindful lifestyle
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} cart={cart} />
          ))}
        </div>
      </div>
    </section>
  );
};
