export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <span className="font-bold">Your Company</span>
        </div>
        <div className="flex gap-8">
          <a href="/docs" className="text-sm hover:underline">Documentation</a>
          <a href="/github" className="text-sm hover:underline">GitHub</a>
          <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
} 