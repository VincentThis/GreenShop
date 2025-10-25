import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const allProducts = [
  { id: 1, name: "Ceramic Vase", price: 50, image: product1, category: "Home Decor" },
  { id: 2, name: "Woven Basket", price: 32, image: product2, category: "Storage" },
  { id: 3, name: "Linen Throw", price: 68, image: product3, category: "Textiles" },
  { id: 4, name: "Wooden Board", price: 54, image: product4, category: "Kitchen" },
  { id: 5, name: "Chef J's Knife", price: 150, image: product5, category: "Kitchen" },
  { id: 6, name: "Raven's Sofa", price: 180, image: product6, category: "Home Decor" },
  { id: 7, name: "Jewelry Box", price: 100, image: product7, category: "Storage" },
  { id: 8, name: "Mond's AAPE", price: 300, image: product8, category: "Textiles" },
];

interface FilterableProductGridProps {
  cart: CartFunctions;
  searchQuery?: string;
  categoryFilter?: string;
}

export const FilterableProductGrid = ({ cart, searchQuery = "", categoryFilter = "All" }: FilterableProductGridProps) => {
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-background">
      <div className="container">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} cart={cart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
