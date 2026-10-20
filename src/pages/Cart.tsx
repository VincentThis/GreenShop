import { Link } from "react-router-dom";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartFunctions } from "@/contexts/CartContext";
import { formatPrice } from "@/data/phones";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
const Cart = ({ cart }: { cart: CartFunctions }) => (
  <>
    <Header cart={cart} />
    <main className="store-shell content-page">
      <span className="eyebrow">GOOD CHOICES, ALL IN ONE PLACE</span>
      <h1>
        Your bag<span className="logo-dot">.</span>
      </h1>
      {!cart.items.length ? (
        <div className="empty-results">
          <ShoppingBag size={38} strokeWidth={1.3} />
          <h2>Your next connection is out there.</h2>
          <p>Add a phone to your bag to get started.</p>
          <Link to="/shop" className="store-button dark-button">
            Find your phone <ArrowUpRight size={17} />
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-layout">
            <div>
              {cart.items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart-item-info">
                    <Link to={`/product/${item.id}`}>
                      <h2>{item.name}</h2>
                    </Link>
                    <p>{item.category}</p>
                    <strong>{formatPrice(item.price)}</strong>
                    <div>
                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() =>
                            cart.updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={13} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            cart.updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="icon-button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => cart.removeFromCart(item.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
            <aside className="cart-summary">
              <h2>The details</h2>
              <div>
                <span>Subtotal ({cart.getTotalItems()} items)</span>
                <span>{formatPrice(cart.getTotalPrice())}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>Not yet available</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>{formatPrice(cart.getTotalPrice())}</span>
              </div>
              <button
                className="store-button dark-button"
                onClick={() => cart.checkout()}
              >
                {isSupabaseConfigured
                  ? "Place demo order"
                  : "Checkout unavailable"}
                <ArrowUpRight size={17} />
              </button>
              <p>
                {isSupabaseConfigured
                  ? "Course project demo. No payment will be collected."
                  : "Your bag is saved on this browser. Ordering will open once the new store backend is connected. No payment is collected."}
              </p>
            </aside>
          </div>
          <Link to="/shop" className="text-link" style={{ marginTop: 30 }}>
            Keep exploring <ArrowUpRight size={16} />
          </Link>
        </>
      )}
    </main>
    <Footer />
  </>
);
export default Cart;
