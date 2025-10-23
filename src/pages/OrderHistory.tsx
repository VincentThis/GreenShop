import { Header } from "@/components/Header";
import { CartFunctions } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: Array<{
    product_name: string;
    product_image: string;
    quantity: number;
    price: number;
  }>;
}

const OrderHistory = ({ cart }: { cart: CartFunctions }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: ordersData, error } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          status,
          created_at,
          order_items (
            product_name,
            product_image,
            quantity,
            price
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(ordersData || []);
      }
      
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <div className="container py-16 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Order History</h1>
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Order History</h1>
        
        <div className="space-y-6 max-w-4xl">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Order placed: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Order ID: {order.id.slice(0, 8)}...
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    ${Number(order.total_amount).toFixed(2)}
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.order_items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
