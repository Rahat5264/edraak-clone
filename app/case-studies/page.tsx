"use client"

// Navigation and Footer are provided by app/layout.tsx
import CaseStudies from '@/components/sections/CaseStudies'
import Contact from '@/components/sections/Contact'

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
