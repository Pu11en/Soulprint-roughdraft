import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { Features } from "@/components/sections/features"
import { CTA } from "@/components/sections/cta"
import { Pricing } from "@/components/sections/pricing"
import { FAQ } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
