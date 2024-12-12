export default function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">${plan.price}<span className="text-sm">/mo</span></p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    features: ["5 API Keys", "Basic Analytics", "Email Support"]
  },
  {
    name: "Pro",
    price: "29",
    features: ["Unlimited API Keys", "Advanced Analytics", "Priority Support"]
  },
  {
    name: "Enterprise",
    price: "99",
    features: ["Custom Solutions", "Dedicated Support", "SLA Guarantee"]
  }
] 