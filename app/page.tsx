import Header from '../components/header'
import Hero from '../components/hero'
import Features from '../components/features'
import Pricing from '../components/pricing'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

