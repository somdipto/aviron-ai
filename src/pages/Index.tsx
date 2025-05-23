
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import UpdatedTestimonial from "@/components/UpdatedTestimonial";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden cosmic-dots">
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="demo">
          <InteractiveDemo />
        </section>
        <section id="testimonials">
          <UpdatedTestimonial />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
