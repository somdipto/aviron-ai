
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthModal from "@/components/AuthModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        navigate("/dashboard");
      }
    };
    getUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-32 flex justify-center">
        <AuthModal isOpen={true} onClose={() => navigate("/")} />
      </main>
      <Footer />
    </div>
  );
}
