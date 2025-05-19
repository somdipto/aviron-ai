
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card max-w-5xl mx-auto p-8 md:p-12 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-blue-600/10"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Aircraft Design Process?
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Join leading aerospace companies and institutions already using AeroAI to revolutionize their design workflows.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
