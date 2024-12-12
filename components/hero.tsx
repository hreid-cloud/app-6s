// Component content will be added hereimport { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 px-4 md:px-6 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Unlock the Power of GitHub Repositories
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
        Get instant insights, summaries, and analytics for any open-source GitHub repository with a6s Github Analyzer.
      </p>
      <Button size="lg" asChild>
        <Link href="/signup">Start Analyzing for Free</Link>
      </Button>
    </section>
  )
}

