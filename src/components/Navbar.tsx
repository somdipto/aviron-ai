
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "py-2 bg-background/80 backdrop-blur-lg shadow-md" : "py-4 bg-transparent"
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="font-bold text-white">A</span>
          </div>
          <span className="text-xl font-bold">AeroAI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="#demo" className="text-sm font-medium hover:text-primary transition-colors">Demo</Link>
          <Link to="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
