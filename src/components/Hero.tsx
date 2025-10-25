import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>
      
      <div className="relative container text-center md:text-left max-w-2xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          Sustainable Living,
          <span className="block text-primary">Beautifully Made</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
          Discover our curated collection of eco-friendly home goods and sustainable essentials.
        </p>
        <Link to="/shop">
          <Button variant="hero" size="lg" className="text-base px-8">
            Shop Collection
          </Button>
        </Link>
      </div>
    </section>
  );
};
