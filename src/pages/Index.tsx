
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden cosmic-dots">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InteractiveDemo />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
