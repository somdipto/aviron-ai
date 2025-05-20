
import PageTemplate from "@/components/PageTemplate";

export default function Technology() {
  return (
    <PageTemplate
      title="Our Technology"
      description="The cutting-edge technologies powering our AI aircraft design platform"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Advanced AI Models</h2>
          <p>
            Aviron AI leverages state-of-the-art deep learning models specifically trained on millions of aircraft designs, aerodynamic simulations, and engineering specifications. Our proprietary neural networks understand the complex relationships between design parameters and performance metrics.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Computational Fluid Dynamics</h2>
          <p>
            Our platform integrates advanced CFD simulations to validate designs in virtual wind tunnels, providing accurate predictions of aerodynamic performance without the time and expense of physical testing.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Generative Design</h2>
          <p>
            By defining design constraints and performance goals, our AI can generate thousands of optimized design variations, exploring possibilities human designers might never consider and identifying innovative solutions to complex engineering challenges.
          </p>
        </section>
      </div>
    </PageTemplate>
  );
}
