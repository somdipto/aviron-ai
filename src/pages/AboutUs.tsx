
import PageTemplate from "@/components/PageTemplate";

export default function AboutUs() {
  return (
    <PageTemplate 
      title="About Aviron AI" 
      description="Revolutionizing aircraft design with artificial intelligence"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            At Aviron AI, we're on a mission to transform the aerospace industry through cutting-edge artificial intelligence. 
            Our platform enables engineers, designers, and manufacturers to create more efficient, 
            sustainable, and innovative aircraft designs in a fraction of the time traditionally required.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p>
            Founded in 2023 by a team of aerospace engineers and AI specialists, Aviron AI emerged from the 
            recognition that aircraft design methodologies had remained largely unchanged for decades, 
            despite revolutionary advances in computing and artificial intelligence.
          </p>
          <p className="mt-4">
            What began as a research project at MIT Manipal has grown into a powerful platform 
            that's helping to shape the future of aviation, making aircraft design more accessible, 
            efficient, and environmentally conscious.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
          <p>
            The Aviron AI platform leverages state-of-the-art machine learning algorithms, 
            computational fluid dynamics, and generative design techniques to revolutionize 
            aircraft development. Our systems analyze millions of design parameters simultaneously, 
            identifying optimal configurations that human engineers might never discover through traditional methods.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p>
            Our diverse team brings together expertise from aerospace engineering, computer science, 
            artificial intelligence, and manufacturing. United by a passion for innovation and sustainability 
            in aviation, we're working to create a future where aircraft design is more accessible, 
            efficient, and environmentally responsible.
          </p>
        </section>
      </div>
    </PageTemplate>
  );
}
