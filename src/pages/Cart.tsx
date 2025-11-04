import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartFunctions } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = ({ cart }: { cart: CartFunctions }) => {
  const handleCheckout = () => {
    cart.checkout();
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to get started</p>
          <Link to="/shop">
            <Button variant="hero">Continue Shopping</Button>
          </Link>

         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-lg font-bold text-foreground mt-2">${item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => cart.removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cart.getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cart.getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
               <Link to="/CheckoutSuccess">
               <Button className="w-full" variant="hero" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
