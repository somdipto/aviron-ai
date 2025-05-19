
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden cosmic-dots">
      {/* Orbiting Elements */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="orbit-element"
          style={{ 
            '--delay': i * 2,
            transform: `rotate(${i * 60}deg) translateX(150px) rotate(-${i * 60}deg)`
          } as React.CSSProperties}
        />
      ))}
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-purple-900/20 to-background"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Rotating Element */}
      <div className="absolute z-10 opacity-20">
        <div className="w-[400px] h-[400px] border border-purple-500/30 rounded-full animate-rotate-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] border border-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-purple-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-rotate-slow"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block mb-4 px-3 py-1 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/20">
              <span className="text-xs font-medium text-purple-300">Revolutionizing Aircraft Design</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Design Aircraft with <span className="text-gradient">Artificial Intelligence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI platform transforms aircraft design processes, reducing time-to-market by 80% while optimizing performance, efficiency, and safety.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button size="lg" className="space-glow bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                Start Designing Now
              </Button>
              <Button variant="outline" size="lg" className="border-purple-500/30 hover:bg-purple-500/10">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* 3D Visualization Placeholder */}
          <div 
            className={`mt-10 transition-all duration-1000 delay-300 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="relative h-[400px] w-full max-w-4xl mx-auto glass-card overflow-hidden animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-purple-300 text-xl">3D Aircraft Visualization</span>
              </div>
              {/* This is a placeholder for a 3D aircraft model or animation */}
              <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-purple-500/50 blur-sm animate-pulse-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
        <svg 
          width="20" 
          height="10" 
          viewBox="0 0 20 10" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
