import { ShoppingCart, Search, Menu, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CartFunctions } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cart: CartFunctions;
  onSearch?: (query: string) => void;
  onCategoryFilter?: (category: string) => void;
}

export const Header = ({ cart, onSearch, onCategoryFilter }: HeaderProps) => {
  const totalItems = cart.getTotalItems();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Verde</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuItem onClick={() => handleCategoryClick("All")}>
                All Products
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryClick("Home Decor")}>
                Home Decor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryClick("Storage")}>
                Storage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryClick("Textiles")}>
                Textiles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryClick("Kitchen")}>
                Kitchen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="icon" title="My Profile">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Orders
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon" title="Log in">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
