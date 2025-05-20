
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const UpdatedTestimonial = () => {
  const testimonials = [
    {
      quote: "Aviron AI has dramatically reduced our aircraft design cycle from months to weeks. The AI-generated designs consistently outperform our traditional approaches in efficiency and innovation.",
      author: "Dr. Samantha Chen",
      role: "Chief Aeronautical Engineer, AeroTech Solutions",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      quote: "Our partnership with Aviron AI has been instrumental in our research on next-generation aircraft design. Their platform provides unparalleled insights and optimization capabilities for our students and faculty.",
      author: "Prof. Rajesh Kumar",
      role: "Department of Aerospace Engineering, MIT Manipal",
      image: "https://i.pravatar.cc/150?img=59",
      logo: "/mit-manipal-logo.png",
      highlight: true,
    },
    {
      quote: "The intuitive interface combined with powerful AI capabilities makes Aviron a game-changer for small and medium aircraft manufacturers like us. We can now compete with the industry giants.",
      author: "Michael Rodriguez",
      role: "CEO, SkyWorks Aviation",
      image: "https://i.pravatar.cc/150?img=68",
    },
  ];

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-950/10"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See why top aerospace companies, research institutions, and manufacturers choose our AI-powered design platform.
          </p>
        </div>
        
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                <div className={`h-full ${testimonial.highlight ? 'glass-card border-purple-500/30' : 'glass-card border-0'} rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-purple-500/10 transition-all duration-300`}>
                  <div>
                    <div className="mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <img className="h-10 w-10 rounded-full" src={testimonial.image} alt={testimonial.author} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {testimonial.logo && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20">
                      <div className="flex justify-center">
                        <img src={testimonial.logo} alt="Partner logo" className="h-10 object-contain opacity-70" />
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default UpdatedTestimonial;
