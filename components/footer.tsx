import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 px-4 md:px-6 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © 2023 a6s Github Analyzer. All rights reserved.
          </p>
        </div>
        <nav className="flex space-x-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}

