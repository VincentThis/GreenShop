import { Header } from "@/components/Header";
import { CartFunctions } from "@/contexts/CartContext";

const About = ({ cart }: { cart: CartFunctions }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">About Us</h1>
        
        <div className="max-w-3xl space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
             We believe in creating a more sustainable future through mindful consumption. 
              Our mission is to provide high-quality, eco-friendly products that don't compromise 
              on style or functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2025, we started with a simple idea: to make sustainable living accessible 
              and beautiful. Every product in our collection is carefully selected by 3 professionals, namely, Vincent, John, and Raymond; 
              for its environmental 
              impact, craftsmanship, and timeless design.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Sustainability: We prioritize eco-friendly materials and practices</li>
              <li>Quality: We believe in products that last</li>
              <li>Transparency: We're honest about our sourcing and impact</li>
              <li>Community: We support local artisans and fair trade</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
