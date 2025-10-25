import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CartFunctions } from "@/contexts/CartContext";

const Index = ({ cart }: { cart: CartFunctions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cart={cart} 
        onCategoryFilter={setCategoryFilter}
      />
      <Hero />
      
      <section className="py-20 bg-secondary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Committed to Sustainability
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Every product in our collection is carefully selected for its environmental impact, 
            craftsmanship, and timeless design.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
