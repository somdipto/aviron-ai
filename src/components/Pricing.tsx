
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const tiers = [
  {
    name: "Academic",
    monthlyPrice: "499",
    features: [
      "Basic AI design generation",
      "5 projects per month",
      "Standard performance analysis",
      "Email support",
      "Educational resources",
      "Single user license"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    monthlyPrice: "1,499",
    features: [
      "Advanced AI design generation",
      "Unlimited projects",
      "Comprehensive performance analysis",
      "Material optimization",
      "Priority support",
      "5 user licenses",
      "Export to major CAD formats"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    features: [
      "Full access to AI capabilities",
      "Unlimited projects and designs",
      "Real-time collaboration",
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited user licenses",
      "On-premises deployment available",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  // Calculate yearly price with 20% discount
  const getPrice = (tier: any) => {
    if (tier.monthlyPrice === "Custom") return "Custom";
    
    const numPrice = parseInt(tier.monthlyPrice.replace(/,/g, ''));
    
    if (annual) {
      // Apply 20% discount to annual plan and multiply by 12
      const annualPrice = Math.round(numPrice * 0.8 * 12);
      return annualPrice.toLocaleString();
    }
    
    return tier.monthlyPrice;
  };

  // Calculate savings amount
  const getSavings = (tier: any) => {
    if (tier.monthlyPrice === "Custom") return "";
    
    const numPrice = parseInt(tier.monthlyPrice.replace(/,/g, ''));
    const monthlyCost = numPrice * 12;
    const annualCost = Math.round(numPrice * 0.8 * 12);
    
    return (monthlyCost - annualCost).toLocaleString();
  };

  return (
    <section id="pricing" className="py-20 relative cosmic-dots">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-80 bg-purple-900/5 transform skew-y-3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Pricing Plans</span> for Every Need
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Choose the plan that works best for your organization, from academic institutions to enterprise corporations.
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${!annual ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                annual ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                  annual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`ml-3 ${annual ? "text-white" : "text-gray-400"}`}>
              Yearly <span className="text-purple-400">(Save 20%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`glass-card relative rounded-xl overflow-hidden transition-transform hover:translate-y-[-5px] ${
                tier.popular ? "border-purple-500/50 space-glow" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold py-1 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">${getPrice(tier)}</span>
                  {tier.monthlyPrice !== "Custom" && (
                    <span className="text-gray-400">/{annual ? "year" : "month"}</span>
                  )}
                </div>
                
                {annual && tier.monthlyPrice !== "Custom" && (
                  <div className="mb-6 inline-flex items-center bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM7 12a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm7-1a1 1 0 100 2h.01a1 1 0 100-2H14zm-.867-3.191a.75.75 0 01.75.75v.591l.768-.768a.75.75 0 111.06 1.06l-2.069 2.07a.75.75 0 01-1.06 0L10.53 9.38a.75.75 0 011.06-1.06l.769.768V8.56a.75.75 0 01.774-.75z" clipRule="evenodd" />
                    </svg>
                    Save ${getSavings(tier)}
                  </div>
                )}
                
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.popular ? "default" : "outline"}
                  className={tier.popular ? "w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" : "w-full border-purple-500/30 hover:bg-purple-500/10"}
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
