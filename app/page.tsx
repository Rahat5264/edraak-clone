'use client'

import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import CameraInspection from '@/components/sections/CameraInspection'
import Solutions from '@/components/sections/Solutions'
import Sectors from '@/components/sections/Sectors'
import Partners from '@/components/sections/Partners'
import Technology from '@/components/sections/Technology'
import BlogSection from '@/components/sections/BlogSection'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Hero />
      <CameraInspection />
      <Solutions />
      <Sectors />
      <Partners />
      <Technology />
      <BlogSection />
      <Contact />
      {/* Footer rendered by app/layout.tsx */}
    </div>
  )
}
 
