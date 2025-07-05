
import { Check } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out our service",
      features: [
        "5 image transformations",
        "Basic styles only",
        "Standard quality",
        "No watermark"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "12",
      description: "For individual creators and hobbyists",
      features: [
        "50 image transformations",
        "All style options",
        "High quality output",
        "Priority processing",
        "No watermark"
      ],
      buttonText: "Get Pro",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Business",
      price: "49",
      description: "For professionals and businesses",
      features: [
        "Unlimited transformations",
        "All style options",
        "Premium quality output",
        "Super-fast processing",
        "API access",
        "Dedicated support"
      ],
      buttonText: "Get Business",
      buttonVariant: "action" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your needs. No hidden fees or commitments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl border ${plan.popular ? 'border-ghibli-500 shadow-lg shadow-ghibli-100' : 'border-gray-200'} overflow-hidden`}
            >
              {plan.popular && (
                <div className="ghibli-gradient text-white text-center py-2 font-medium text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold">${plan.price}</span>
                  <span className="ml-1 text-xl text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-ghibli-500" />
                      </div>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <GradientButton variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </GradientButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include 14-day money-back guarantee. Need a custom plan?
            <a href="#" className="text-ghibli-600 font-medium ml-1">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
