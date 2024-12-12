export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Secure Storage",
    description: "Your API keys are encrypted and stored with industry-standard security practices."
  },
  {
    title: "Easy Management",
    description: "Intuitive interface to create, update, and revoke API keys with just a few clicks."
  },
  {
    title: "Access Control",
    description: "Fine-grained permissions and role-based access control for team management."
  }
] 