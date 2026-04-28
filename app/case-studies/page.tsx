// Navigation and Footer are provided by app/layout.tsx
import CaseStudies from '@/components/sections/CaseStudies'
import Contact from '@/components/sections/Contact'

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
