// Navigation and Footer are provided by app/layout.tsx
import CaseStudies from '@/components/sections/CaseStudies'
import Contact from '@/components/sections/Contact'
import content from '@/data/content.json'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  return {
    title: `Case Studies | ${siteName}`,
    description: content?.brand?.tagline || 'Case studies showcasing Edraak Systems implementations.',
    alternates: { canonical: `${SITE_URL}/case-studies` }
  }
}

export const metadata = {
  title: 'Case Studies',
  description: 'Industrial case studies showcasing Edraak Systems deployments and results across textile production lines.',
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main>
        <CaseStudies />
      </main>

      <Contact />
      {/* Footer rendered by app/layout.tsx */}
    </div>
  )
}
