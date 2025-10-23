import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CartFunctions } from "@/contexts/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  cart: CartFunctions;
}

export const ProductCard = ({ id, name, price, image, category, cart }: ProductCardProps) => {
  const handleAddToCart = () => {
    cart.addToCart({ id, name, price, image, category });
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">${price}</span>
          <Button size="sm" variant="secondary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
