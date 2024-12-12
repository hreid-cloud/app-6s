import { SignInButton } from './SignInButton'

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
          Your API Management Solution
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Simplify your API key management with our secure and intuitive dashboard.
        </p>
        <div className="flex justify-center gap-4">
          <SignInButton />
        </div>
      </div>
    </section>
  )
} 