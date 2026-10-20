export const brands = ["All", "Apple", "Samsung", "Xiaomi", "Redmi"] as const;
export interface Phone {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  storage: string;
  color: string;
  colors: string[];
  tag?: string;
  description: string;
}
// Illustrative catalogue and PHP prices for the course project, not live inventory.
export const phones: Phone[] = [
  {
    id: 101,
    name: "iPhone 16 Pro",
    category: "Apple",
    price: 69990,
    image: "/phones/iphone-pro.svg",
    storage: "256 GB",
    color: "Desert Titanium",
    colors: ["#bcaa93", "#444544", "#e1dfd8"],
    tag: "Spotlight",
    description:
      "A refined titanium look for the moments you want to capture. Explore the Pro side of iPhone in a warm Desert Titanium finish.",
  },
  {
    id: 102,
    name: "Galaxy S25 Ultra",
    category: "Samsung",
    price: 84990,
    image: "/phones/galaxy-ultra.svg",
    storage: "256 GB",
    color: "Titanium Gray",
    colors: ["#a6aaa4", "#252a31", "#b9c9df"],
    tag: "Fan favorite",
    description:
      "A bold, expansive canvas for your everyday ideas. Meet the Galaxy Ultra in a clean, understated titanium gray finish.",
  },
  {
    id: 103,
    name: "Xiaomi 14",
    category: "Xiaomi",
    price: 45999,
    image: "/phones/xiaomi.svg",
    storage: "256 GB",
    color: "Jade Green",
    colors: ["#739a8e", "#292f2b", "#e4e4df"],
    description:
      "A compact silhouette with a fresh jade finish. A considered choice for anyone who loves clean design and a pocket-friendly form.",
  },
  {
    id: 104,
    name: "Redmi Note 14 Pro",
    category: "Redmi",
    price: 17999,
    image: "/phones/redmi.svg",
    storage: "256 GB",
    color: "Lavender Purple",
    colors: ["#aaa0c4", "#27312f", "#c5d6cc"],
    tag: "Everyday value",
    description:
      "Bring a little color to your daily routine. A statement lavender finish, with an accessible starting point for your next upgrade.",
  },
  {
    id: 105,
    name: "iPhone 16",
    category: "Apple",
    price: 54990,
    image: "/phones/iphone.svg",
    storage: "128 GB",
    color: "Ultramarine",
    colors: ["#6d76c4", "#bad7ca", "#26292e"],
    description:
      "Familiar, colorful, and ready for your day. Discover iPhone in a vibrant Ultramarine finish.",
  },
  {
    id: 106,
    name: "Galaxy A55 5G",
    category: "Samsung",
    price: 24990,
    image: "/phones/galaxy-a.svg",
    storage: "128 GB",
    color: "Awesome Iceblue",
    colors: ["#bccdd8", "#343c52", "#d9cce2"],
    description:
      "An easygoing everyday companion in a soft ice-blue finish. A simple place to start your Galaxy journey.",
  },
  {
    id: 107,
    name: "Xiaomi 14T",
    category: "Xiaomi",
    price: 25999,
    image: "/phones/xiaomi-t.svg",
    storage: "256 GB",
    color: "Titan Gray",
    colors: ["#858b91", "#a1b9b4", "#25282b"],
    description:
      "Minimal lines, a confident finish, and room for your everyday essentials. Discover the Xiaomi 14T in Titan Gray.",
  },
  {
    id: 108,
    name: "Redmi Note 13",
    category: "Redmi",
    price: 8999,
    image: "/phones/redmi-note.svg",
    storage: "128 GB",
    color: "Mint Green",
    colors: ["#a2c8b9", "#252b30", "#a8b8d0"],
    description:
      "A fresh mint finish for a fresh start. Explore an approachable upgrade for calls, connections, and the everyday.",
  },
];
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
