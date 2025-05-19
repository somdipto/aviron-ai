
import { useEffect, useState } from "react";

const features = [
  {
    title: "AI-Powered Design",
    description: "Generate aircraft designs based on your specifications with our proprietary AI model trained on thousands of successful aircraft.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Performance Analysis",
    description: "Instant aerodynamic performance metrics and real-time simulation capabilities for comprehensive analysis.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Material Optimization",
    description: "Suggest optimal materials and structures to balance weight, durability, and cost based on your requirements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: "Compliance Testing",
    description: "Automatically verify designs against FAA, EASA, and other regulatory requirements to ensure certification readiness.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Collaborative Workspace",
    description: "Real-time collaboration tools allow teams to work simultaneously on designs from anywhere in the world.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Export & Integration",
    description: "Seamlessly export designs to CAD software or directly to manufacturing partners with our integration ecosystem.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
];

const Features = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleFeatures((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll(".feature-item").forEach((item) => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 relative cosmic-dots">
      {/* Rotating Squares */}
      <div className="absolute left-0 top-40 w-40 h-40 opacity-20">
        <div className="absolute inset-0 border border-purple-500/30 rounded-md animate-rotate-slow"></div>
        <div className="absolute inset-0 border border-purple-500/20 rounded-md animate-rotate-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-1/4 border border-purple-500/40 rounded-md animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>
      
      <div className="absolute right-0 bottom-40 w-40 h-40 opacity-20">
        <div className="absolute inset-0 border border-blue-500/30 rounded-md animate-rotate-slow"></div>
        <div className="absolute inset-0 border border-blue-500/20 rounded-md animate-rotate-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-1/4 border border-blue-500/40 rounded-md animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-700/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Modern Aircraft Design
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with industry expertise to revolutionize how aircraft are designed, tested, and manufactured.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-item glass-card p-6 transition-all duration-700 transform ${
                visibleFeatures.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } hover:border-purple-500/30 hover:translate-y-[-5px]`}
            >
              <div className="mb-4 p-3 inline-flex rounded-full bg-purple-900/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
