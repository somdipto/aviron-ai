
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    position: "Head of Aerospace Engineering, Stanford University",
    company: "Stanford University",
    quote: "AeroAI has transformed how we teach aircraft design. Our students can now experiment with hundreds of iterations in the time it used to take to create one manual design.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Mohammed Al-Farsi",
    position: "Director of Innovation",
    company: "Dubai Aerospace Enterprise",
    quote: "The integration of AI into our design workflow has cut our development time by 70% and produced more efficient aircraft than our traditional methods ever could.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Jessica Wright",
    position: "Chief Technology Officer",
    company: "AeroTech Innovations",
    quote: "AeroAI's platform doesn't just speed up our design process—it actually suggests novel approaches our engineers hadn't considered. It's like having a thousand experts in one tool.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setAnimating(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-0 w-full h-80 bg-blue-900/10 transform -skew-y-3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how AeroAI is transforming aerospace design for organizations around the world.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className={`glass-card p-8 md:p-10 transition-opacity duration-500 ${
              animating ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500 p-1">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <div>
                <svg className="h-8 w-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <p className="text-xl font-medium mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div>
                  <h4 className="font-bold">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-gray-300">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "bg-blue-500 w-8" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
