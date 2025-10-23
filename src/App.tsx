import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { CartItem } from "./contexts/CartContext";
import Index from "./pages/Index";
import ShopWithFilters from "./pages/ShopWithFilters";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import OrderHistory from "./pages/OrderHistory";
import { supabase } from "./integrations/supabase/client";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(cart.map((i) => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map((item) => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const checkout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }

    try {
      const totalAmount = getTotalPrice();
      
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: "completed",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        product_category: item.category,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setCart([]);
      window.location.href = "/checkout-success";
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to complete checkout. Please try again.");
    }
  };

  const cartFunctions = {
    items: cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    checkout,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index cart={cartFunctions} />} />
            <Route path="/shop" element={<ShopWithFilters cart={cartFunctions} />} />
            <Route path="/cart" element={<Cart cart={cartFunctions} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About cart={cartFunctions} />} />
            <Route path="/contact" element={<Contact cart={cartFunctions} />} />
            <Route path="/product/:id" element={<ProductDetail cart={cartFunctions} />} />
            <Route path="/checkout-success" element={<CheckoutSuccess cart={cartFunctions} />} />
            <Route path="/orders" element={<OrderHistory cart={cartFunctions} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
