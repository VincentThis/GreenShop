import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CartFunctions } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const CheckoutSuccess = ({ cart }: { cart: CartFunctions }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-16 flex items-center justify-center">
        <div className="text-center max-w-md space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="w-24 h-24 text-green-500 animate-scale-in" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground">Order Successful!</h1>
          
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been placed successfully 
            and you'll receive a confirmation email shortly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/orders">
              <Button variant="hero">View Orders</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
