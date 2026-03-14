import React from 'react'
import content from '@/data/content.json'
// Sectors section removed per request
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export const metadata = {
  title: 'Edraak Vision System',
}

export default function VisionSystemPage() {
  const vision = content.visionSystem
  const cam = content.cameraIndustries
  const subtabs = content.sectors.items[0].subtabs
  const images = cam.images || []
  const images8 = Array.from({ length: 8 }).map((_, i) => images[i % Math.max(images.length, 1)] || cam.image)

  return (
    <main className="bg-gray-50">
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Camera Inspection</h1>
          <p className="text-gray-700 leading-relaxed">
            EVS (Edraak Vision System) is a reliable AI-powered camera inspection solution for production lines. It uses high-resolution cameras and smart algorithms to scan fabrics in real time, spotting defects accurately so mills can catch issues early, reduce waste, and deliver better quality rolls to buyers.
          </p>
        </div>
      </section>

      {/* Fabric topics: Greige / Dyed / Denim */}
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">Fabric Inspection Topics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">Key inspection stages and tailored checks for different fabric types.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/** Greige */}
            <div className="bg-primary text-white rounded-lg shadow-sm p-4 flex flex-col items-stretch">
              <div className="w-full h-40 md:h-48 rounded-md overflow-hidden mb-4">
                <img src={images[0] || cam.image} alt="Greige fabric" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Greige Fabric</h3>
              <p className="text-white/90 leading-relaxed">EVS inspects greige (raw/unfinished) fabric straight from the loom, detecting common defects like knots, slubs, holes, broken yarns, thick/thin places, and uneven weave in real time. This prevents faulty greige from moving to dyeing, cuts down on rework, improves yield, and keeps weaving consistent.</p>
            </div>

            {/** Dyed */}
            <div className="bg-primary text-white rounded-lg shadow-sm p-4 flex flex-col items-stretch">
              <div className="w-full h-40 md:h-48 rounded-md overflow-hidden mb-4">
                <img src={images[1] || cam.image} alt="Dyed fabric" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Dyed</h3>
              <p className="text-white/90 leading-relaxed">EVS checks dyed fabrics for issues that appear after coloring, such as uneven dyeing (patchy or cloudy shades), stains, dye marks, streaks, and weave faults visible post-dye. Running at full production speed, it flags problems instantly for marking or removal, helping maintain uniform color quality and avoid buyer rejections.</p>
            </div>

            {/** Denim */}
            <div className="bg-primary text-white rounded-lg shadow-sm p-4 flex flex-col items-stretch">
              <div className="w-full h-40 md:h-48 rounded-md overflow-hidden mb-4">
                <img src={subtabs[2]?.image || images[2] || cam.image} alt="Denim fabric" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Denim</h3>
              <p className="text-white/90 leading-relaxed">EVS specializes in denim inspection, identifying streaks, holes, broken yarns, slubs, neps, barre marks, and finishing defects on the fly. In busy denim lines, it increases first-quality output, shortens manual checks, lowers rejection rates, and helps meet strict buyer standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:min-h-[420px] lg:min-h-[560px] flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto text-center px-4 box-border">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">Camera Inspection in Other Industries</h2>
          {Array.isArray(cam.description)
            ? cam.description.map((para: string, i: number) => (
                <p key={i} className="text-black mb-6">{para}</p>
              ))
            : <p className="text-black mb-6">{cam.description}</p>
          }

          {/* Mobile: horizontal scrollable bar */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto py-4 pl-4 pr-4 touch-pan-x">
              {images8.map((src: string, idx: number) => (
                <div key={idx} className="flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden shadow-sm">
                  <img src={src} alt={`industry-${idx}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: non-scrollable grid of small images */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
            {images8.map((src: string, idx: number) => (
              <div key={idx} className="w-full h-24 rounded-lg overflow-hidden shadow-sm">
                <img src={src} alt={`industry-${idx}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 'How EVS Works' and 'Sector Wise Solutions' removed per user request */}
    </main>
  )
}
