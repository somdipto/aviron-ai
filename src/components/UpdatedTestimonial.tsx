
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Aviron AI has revolutionized our aircraft development process. We've cut design time by 70% while improving performance metrics across the board.",
    author: "Sarah Chen",
    title: "Chief Engineering Officer at AeroDynamics Ltd",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    content: "As an academic institution focused on aerospace innovation, our partnership with Aviron AI has provided our students with cutting-edge tools that bridge theoretical knowledge and practical application.",
    author: "Dr. Ranjit Kumar",
    title: "Director, Department of Aerospace Engineering, MIT Manipal",
    avatar: "https://mit.manipal.edu/content/dam/manipal/mu/mit/images/banners/deanmain1.png"
  },
  {
    content: "The AI-powered optimization features have given us a competitive edge in the market. Our latest prototype achieved fuel efficiency improvements that exceeded our expectations.",
    author: "Michael Torres",
    title: "Head of Innovation at Skyways Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  }
];

const UpdatedTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with MIT Manipal testimonial
  const [autoplay, setAutoplay] = useState(true);
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
  };
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setAutoplay(false);
  };
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tr from-blue-900/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See what aerospace professionals are saying about our AI-powered aircraft design platform
          </p>
        </div>
        
        {/* Testimonial slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <Quote className="h-12 w-12 text-purple-500/50" />
              </div>
              
              <div className="relative min-h-[200px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 absolute inset-0 transform ${
                      activeIndex === index 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <p className="text-center text-lg md:text-xl mb-8">"{testimonial.content}"</p>
                    
                    <div className="flex flex-col items-center">
                      <Avatar className="h-16 w-16 mb-3 border-2 border-purple-500/50">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.author.split(" ").map(name => name[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-4">
                  <Button onClick={prevTestimonial} variant="outline" size="icon" className="rounded-full border-purple-500/30 hover:bg-purple-500/10">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-1.5">
                    {testimonials.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => {
                          setActiveIndex(index);
                          setAutoplay(false);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          activeIndex === index ? "w-8 bg-purple-500" : "w-2 bg-gray-600"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <Button onClick={nextTestimonial} variant="outline" size="icon" className="rounded-full border-purple-500/30 hover:bg-purple-500/10">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpdatedTestimonial;
