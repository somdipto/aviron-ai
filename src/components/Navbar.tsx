
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Initial check for user
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate("/");
  };

  const handleAuth = () => {
    setAuthModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-background/90 backdrop-blur-lg shadow-md" : "py-4 bg-transparent"
      }`}>
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Logo className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Aviron AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => location.pathname === '/' ? scrollToSection('hero') : navigate('/')} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button onClick={() => location.pathname === '/' ? scrollToSection('features') : navigate('/#features')} className="text-sm font-medium hover:text-primary transition-colors">Features</button>
            <button onClick={() => location.pathname === '/' ? scrollToSection('demo') : navigate('/#demo')} className="text-sm font-medium hover:text-primary transition-colors">Demo</button>
            <button onClick={() => location.pathname === '/' ? scrollToSection('pricing') : navigate('/#pricing')} className="text-sm font-medium hover:text-primary transition-colors">Pricing</button>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          </div>
          
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-9 w-20 rounded-md bg-secondary/40 animate-pulse"></div>
            ) : user ? (
              <>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:inline-flex border-purple-500/30 hover:bg-purple-500/10"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:inline-flex border-purple-500/30 hover:bg-purple-500/10"
                  onClick={handleAuth}
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={() => {
                    setAuthModalOpen(true);
                    navigate("?tab=signup", { replace: true });
                  }}
                >
                  Get Started
                </Button>
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-purple-500/30">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-xl border-purple-500/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button onClick={() => {
                    navigate('/');
                    setTimeout(() => scrollToSection('hero'), 100);
                  }} className="text-lg font-medium">Home</button>
                  <button onClick={() => {
                    navigate('/');
                    setTimeout(() => scrollToSection('features'), 100);
                  }} className="text-lg font-medium">Features</button>
                  <button onClick={() => {
                    navigate('/');
                    setTimeout(() => scrollToSection('demo'), 100);
                  }} className="text-lg font-medium">Demo</button>
                  <button onClick={() => {
                    navigate('/');
                    setTimeout(() => scrollToSection('pricing'), 100);
                  }} className="text-lg font-medium">Pricing</button>
                  <Link to="/about" className="text-lg font-medium">About</Link>
                  
                  <div className="pt-4 border-t border-purple-500/20">
                    {user ? (
                      <div className="space-y-4">
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        >
                          Dashboard
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-purple-500/30"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                          onClick={() => {
                            setAuthModalOpen(true);
                            navigate("?tab=signup", { replace: true });
                          }}
                        >
                          Get Started
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-purple-500/30"
                          onClick={handleAuth}
                        >
                          Log In
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
