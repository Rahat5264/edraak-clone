import Navigation from '@/components/sections/Navigation'
import content from '@/data/content.json'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  const title = content?.hero?.title ? `${content.hero.title} | ${siteName}` : siteName
  const description = Array.isArray(content?.hero?.description) ? content.hero.description.join(' ') : content?.brand?.tagline || ''
  return {
    title,
    description,
    openGraph: { title, description, url: SITE_URL },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: SITE_URL }
  }
}

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
 
