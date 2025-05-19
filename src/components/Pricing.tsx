
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const tiers = [
  {
    name: "Academic",
    price: "499",
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
    price: "1,499",
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
    price: "Custom",
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
                <div className="mb-6">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-gray-400">/{annual ? "year" : "month"}</span>
                  )}
                </div>
                
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
