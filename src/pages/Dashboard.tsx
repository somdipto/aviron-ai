
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) {
        navigate("/auth");
        return;
      }
      
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-12 w-12 mx-auto rounded-full bg-purple-600/30"></div>
          <div className="h-4 w-48 mx-auto rounded bg-purple-600/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            Sign Out
          </Button>
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Aircraft Designs</h2>
          
          <Card className="glass-card border-0 mb-8 shadow-xl">
            <CardHeader>
              <CardTitle>Your Latest Design</CardTitle>
              <CardDescription>Generated based on your specifications</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center relative">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-blue-900/20 flex items-center justify-center">
                  <div className="space-glow p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fuel Efficiency</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                    <div className="bg-purple-500 h-1.5 rounded-full w-[92%]"></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Drag Coefficient</span>
                    <span>0.021</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                    <div className="bg-purple-500 h-1.5 rounded-full w-[85%]"></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weight Optimization</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full w-[88%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate("/#demo")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Generate New Design
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
