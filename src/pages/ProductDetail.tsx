import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CartFunctions } from "@/contexts/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import { toast } from "sonner";

const products = [
  { id: 1, name: "Ceramic Vase", price: 50, image: product1, category: "Home Decor", description: "Handcrafted ceramic vase perfect for fresh flowers. Made from sustainable materials with a beautiful minimalist design." },
  { id: 2, name: "Woven Basket", price: 32, image: product2, category: "Storage", description: "Natural woven basket ideal for storage. Eco-friendly and durable, perfect for organizing your home." },
  { id: 3, name: "Linen Throw", price: 68, image: product3, category: "Textiles", description: "Soft linen throw blanket made from organic materials. Adds warmth and style to any room." },
  { id: 4, name: "Wooden Board", price: 54, image: product4, category: "Kitchen", description: "Premium wooden cutting board crafted from sustainable bamboo. Perfect for meal preparation." },
  { id: 5, name: "Chef J's Knife", price: 150, image: product5, category: "Kitchen", description: "A stunning chef's knife boasting a damascus steel blade with intricate patterns. The handle is crafted in a beautiful mint green, accented with polished gold bolsters, merging exquisite craftsmanship with sophisticated design." },
  { id: 6, name: "Raven's Sofa", price: 180, image: product6, category: "Home Decor", description: "This elegant two-seater sofa features a soothing mint green upholstery, complemented by sleek gold-finished legs and subtle trim. Its minimalist design and soft curves exude modern luxury, perfect for a refined living space." },
  { id: 7, name: "Jewelry Box", price: 100, image: product7, category: "Storage", description: "This refined jewelry box, rendered in a sophisticated mint green with luxurious gold accents, features multiple compartments, a pull-out drawer, and an internal mirror. It's designed to beautifully organize and protect your cherished pieces.." },
  { id: 8, name: "Mond's AAPE", price: 300, image: product8, category: "Textiles", description: "These cargo pants feature the iconic green camouflage pattern, integrated with the brand's signature ape head logo throughout. Designed for a relaxed fit, they include practical cargo pockets and adjustable drawstrings at the waist and cuffs, embodying a distinct streetwear style.." },
];

const ProductDetail = ({ cart }: { cart: CartFunctions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Product Not Found</h1>
          <Button onClick={() => navigate("/shop")} variant="hero">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    cart.addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            <div className="border-t border-b py-6">
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full" variant="hero" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border rounded p-3">
                  <p className="font-semibold text-foreground">Sustainable</p>
                  <p className="text-muted-foreground">Eco-friendly materials</p>
                </div>
                <div className="border rounded p-3">
                  <p className="font-semibold text-foreground">Quality</p>
                  <p className="text-muted-foreground">Built to last</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
