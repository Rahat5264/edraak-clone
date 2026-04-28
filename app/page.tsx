import content from '@/data/content.json'
import Hero from '@/components/sections/Hero'
import CameraInspection from '@/components/sections/CameraInspection'
import Solutions from '@/components/sections/Solutions'
import Sectors from '@/components/sections/Sectors'
import IndustrialUseCases from '@/components/sections/IndustrialUseCases'
import Technology from '@/components/sections/Technology'
import Careers from '@/components/sections/CareersWrapper'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  const title = 'Fabric Quality Control & Traceability Solutions.'
  const description = Array.isArray(content?.hero?.description)
    ? content.hero.description.join(' ')
    : content?.hero?.description || content?.brand?.tagline || ''

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
    </div>
  )
}
      <Solutions />

