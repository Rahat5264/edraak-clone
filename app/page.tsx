import content from '@/data/content.json'
import Hero from '@/components/sections/Hero'
import CameraInspection from '@/components/sections/CameraInspection'
import Solutions from '@/components/sections/Solutions'
import Sectors from '@/components/sections/Sectors'
import IndustrialUseCases from '@/components/sections/IndustrialUseCases'
import Technology from '@/components/sections/Technology'
import Careers from '@/components/sections/CareersWrapper'
import BlogSection from '@/components/sections/BlogSection'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  const title = 'Fabric Quality Control & Traceability Solutions.'
  const description = 'AI-driven fabric quality control system that detects defects in real-time. It also ensures traceability and provides Industry 4.0 textile QC solutions.'

  return {
    title,
    description,
    openGraph: { title, description, url: SITE_URL, siteName },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: SITE_URL },
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Hero />
      <CameraInspection />
      <Solutions />
      <Sectors />
      <IndustrialUseCases />
      <Technology />
      <Careers />
      <BlogSection />
    </div>
  )
}

