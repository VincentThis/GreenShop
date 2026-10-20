import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartFunctions } from "@/contexts/CartContext";
import { phones, formatPrice } from "@/data/phones";
const ProductDetail = ({ cart }: { cart: CartFunctions }) => {
  const { id } = useParams();
  const phone = phones.find((product) => product.id === Number(id));
  if (!phone)
    return (
      <>
        <Header cart={cart} />
        <main className="store-shell empty-results">
          <h1>We couldn’t find that phone.</h1>
          <Link to="/shop" className="store-button dark-button">
            Explore all phones
          </Link>
        </main>
        <Footer />
      </>
    );
  return (
    <>
      <Header cart={cart} />
      <main className="store-shell detail-page">
        <Link to="/shop" className="text-link">
          <ArrowLeft size={16} /> Back to all phones
        </Link>
        <div className="detail-layout">
          <div className="detail-art">
            <span className="eyebrow">
              {phone.category} / THE PHONEHAUS EDIT
            </span>
            <img
              src={phone.image}
              alt={`${phone.name}, ${phone.color}, product illustration`}
            />
            <span>Product illustration · actual appearance may vary</span>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">YOUR NEXT CONNECTION</span>
            <h1>{phone.name}</h1>
            <p className="detail-description">{phone.description}</p>
            <strong className="detail-price">{formatPrice(phone.price)}</strong>
            <p className="demo-price">
              Illustrative price for this concept store
            </p>
            <div className="detail-option">
              <span>Finish</span>
              <strong>{phone.color}</strong>
              <div className="color-swatches large">
                <span style={{ background: phone.colors[0] }} />
                <Check size={15} />
              </div>
            </div>
            <div className="detail-option">
              <span>Storage</span>
              <strong className="storage-pill">{phone.storage}</strong>
            </div>
            <button
              className="store-button dark-button add-bag-button"
              onClick={() => {
                cart.addToCart(phone);
                toast.success(`${phone.name} added to your bag`);
              }}
            >
              <ShoppingBag size={18} /> Add to bag <ArrowUpRight size={18} />
            </button>
            <p className="detail-note">
              One selected finish and storage option per listing. Browse and
              build your bag; checkout opens when the new store backend is
              connected.
            </p>
          </div>
        </div>
        <section className="featured-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h2>
                Another good connection<span>.</span>
              </h2>
            </div>
          </div>
          <div className="phone-grid">
            {phones
              .filter((item) => item.id !== phone.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard key={item.id} {...item} cart={cart} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProductDetail;
