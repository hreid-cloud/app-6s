export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Add your logo here */}
          <span className="text-xl font-bold">Logo</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-gray-600">Features</a>
          <a href="#pricing" className="hover:text-gray-600">Pricing</a>
          <a href="/login" className="hover:text-gray-600">Login</a>
        </div>
      </nav>
    </header>
  )
} 