import { useState } from "react";
import { Header } from "@/components/Header";
import { FilterableProductGrid } from "@/components/FilterableProductGrid";
import { CartFunctions } from "@/contexts/CartContext";

const ShopWithFilters = ({ cart }: { cart: CartFunctions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cart={cart} 
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
      />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Shop All Products</h1>
        <FilterableProductGrid 
          cart={cart} 
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
        />
      </div>
    </div>
  );
};

export default ShopWithFilters;
