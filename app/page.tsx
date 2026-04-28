import content from '@/data/content.json'
import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import CameraInspection from '@/components/sections/CameraInspection'
import Solutions from '@/components/sections/Solutions'
import Sectors from '@/components/sections/Sectors'
import IndustrialUseCases from '@/components/sections/IndustrialUseCases'
// import Partners from '@/components/sections/Partners'
import Technology from '@/components/sections/Technology'
import BlogSection from '@/components/sections/BlogSection'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import Careers from '@/components/sections/CareersWrapper'

export const metadata = {
  title: content?.brand?.name || 'Edraak Systems',
  description: content?.hero?.description || content?.brand?.tagline || 'Traceability & Quality in Textiles, Apparel & Other Industries',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Hero />
      <CameraInspection />
      <Solutions />
      <Sectors />
      <IndustrialUseCases />
      {/* <Partners /> */}
      <Technology />

      <Careers />
      {/* <BlogSection /> */}
      {/* <Contact /> */}
      {/* Footer rendered by app/layout.tsx */}
    </div>
  )
}
 
