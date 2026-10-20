import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CartFunctions } from "@/contexts/CartContext";
import { Phone, formatPrice } from "@/data/phones";
export const ProductCard = ({
  cart,
  ...phone
}: Phone & { cart: CartFunctions }) => (
  <article className="phone-card">
    <Link
      to={`/product/${phone.id}`}
      className="phone-card-art"
      aria-label={`View ${phone.name}`}
    >
      <div className="phone-card-top">
        <span className={phone.tag ? "product-tag" : "product-brand"}>
          {phone.tag || phone.category}
        </span>
        <ArrowUpRight size={18} />
      </div>
      <img
        src={phone.image}
        alt={`${phone.name} in ${phone.color}, illustration`}
        loading="lazy"
      />
      <span className="phone-color-name">{phone.color}</span>
    </Link>
    <div className="phone-card-info">
      <div className="product-meta">
        <span>
          {phone.category} / {phone.storage}
        </span>
        <div
          className="color-swatches"
          aria-label={`Illustrated finish: ${phone.color}`}
        >
          {phone.colors.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
      </div>
      <Link to={`/product/${phone.id}`}>
        <h3>{phone.name}</h3>
      </Link>
      <div className="product-price-row">
        <strong>{formatPrice(phone.price)}</strong>
        <button
          className="quick-add"
          aria-label={`Add ${phone.name} to bag`}
          onClick={() => {
            cart.addToCart(phone);
            toast.success(`${phone.name} added to your bag`);
          }}
        >
          <Plus size={17} />
        </button>
      </div>
    </div>
  </article>
);
