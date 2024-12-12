// Component content will be added hereimport Link from 'next/link'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 lg:px-8 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        a6s Github Analyzer
      </Link>
      <nav className="space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
    </header>
  )
}

