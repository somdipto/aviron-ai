
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-20 relative cosmic-dots">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card max-w-5xl mx-auto p-8 md:p-12 rounded-xl overflow-hidden relative space-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-blue-600/5"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-purple-500/20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Aircraft Design Process?
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Join leading aerospace companies and institutions already using Aviron AI to revolutionize their design workflows.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="space-glow bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-purple-500/30 hover:bg-purple-500/10">
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
