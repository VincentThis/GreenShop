import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import { supabase, isSupabaseConfigured } from "./integrations/supabase/client";
import { AccountPreview } from "./pages/AccountPreview";
import { phones } from "./data/phones";
import { ScrollToTop } from "./components/ScrollToTop";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("phonehaus-bag-v1") || "[]",
      );
      if (!Array.isArray(saved)) return [];
      return phones.flatMap((phone) => {
        const item = saved.find((value) => value && value.id === phone.id);
        return item && Number.isSafeInteger(item.quantity) && item.quantity > 0
          ? [{ ...phone, quantity: Math.min(item.quantity, 99) }]
          : [];
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("phonehaus-bag-v1", JSON.stringify(cart));
    } catch {
      /* Browsing still works when browser storage is unavailable. */
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((previous) =>
      previous.some((phone) => phone.id === item.id)
        ? previous.map((phone) =>
            phone.id === item.id
              ? { ...phone, quantity: Math.min(phone.quantity + 1, 99) }
              : phone,
          )
        : [...previous, { ...item, quantity: 1 }],
    );
  };

  const removeFromCart = (id: number) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(quantity, 99) } : item,
        ),
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const checkout = async () => {
    if (!isSupabaseConfigured) {
      toast.info(
        "Ordering will open when the new store backend is connected. Your bag is saved.",
      );
      return;
    }
    if (!cart.length) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

      const orderItems = cart.map((item) => ({
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
      window.location.hash = "/checkout-success";
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
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index cart={cartFunctions} />} />
            <Route
              path="/shop"
              element={<ShopWithFilters cart={cartFunctions} />}
            />
            <Route path="/cart" element={<Cart cart={cartFunctions} />} />
            <Route
              path="/auth"
              element={
                isSupabaseConfigured ? (
                  <Auth />
                ) : (
                  <AccountPreview cart={cartFunctions} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isSupabaseConfigured ? (
                  <Profile />
                ) : (
                  <AccountPreview cart={cartFunctions} />
                )
              }
            />
            <Route path="/about" element={<About cart={cartFunctions} />} />
            <Route path="/contact" element={<Contact cart={cartFunctions} />} />
            <Route
              path="/product/:id"
              element={<ProductDetail cart={cartFunctions} />}
            />
            <Route
              path="/checkout-success"
              element={
                isSupabaseConfigured ? (
                  <CheckoutSuccess cart={cartFunctions} />
                ) : (
                  <AccountPreview cart={cartFunctions} />
                )
              }
            />
            <Route
              path="/orders"
              element={
                isSupabaseConfigured ? (
                  <OrderHistory cart={cartFunctions} />
                ) : (
                  <AccountPreview cart={cartFunctions} />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
