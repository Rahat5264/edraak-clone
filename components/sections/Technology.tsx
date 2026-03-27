'use client'

import { useMemo, useState, useEffect } from 'react'
import content from '@/data/content.json'

export default function Technology() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tech = content?.technology || {}

  const tabs = useMemo(() => {
    const labels = tech.tabLabels || []

    // Section intro should come from the technology block; fallback to visionSystem if missing
    const introText = tech.description || content?.visionSystem?.description?.[0] || ''
    const items = tech.items || []
    const cameraImages = content?.cameraIndustries?.images || []

    return labels.map((label, idx) => {
      const primaryImage = items[idx]?.image || cameraImages[idx] || '/placeholder.jpg'

      return {
        title: label,
        // Each tab shows its corresponding item's description (if present)
        description: items[idx]?.description || '',
        image: primaryImage,
      }
    })
  }, [])

  const activeTab = tabs[activeIndex] || tabs[0]

  useEffect(() => {
    // Preload all tab images so switching tabs shows images instantly
    tabs.forEach((t) => {
      if (t?.image) {
        const img = new Image()
        img.src = t.image
      }
    })
  }, [tabs])

  return (
    <section id="technology" className="bg-[var(--site-header-bg)] text-white px-4 py-12 md:py-16 md:min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold tracking-tight mb-4 text-white">{tech.title || ''}</h2>
        <p className="text-white/90 max-w-3xl text-base md:text-lg leading-relaxed">{tech.description || content?.visionSystem?.description?.[0] || ''}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10 items-start">
          <div className="flex flex-col gap-2">
            {tabs.map((tab, idx) => {
              const isActive = idx === activeIndex

              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left text-sm md:text-base leading-snug px-4 py-3 rounded-none transition-colors ${isActive ? 'bg-[#02879F] text-white' : 'text-white/90 hover:text-white'}`}
                >
                  {tab.title}
                </button>
              )
            })}
          </div>

          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed text-white/95 max-w-3xl lg:hidden">{activeTab.description}</p>

            <div className="relative overflow-hidden rounded-sm bg-white/10 aspect-[16/6] md:aspect-[16/5]">
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className="w-full h-full object-cover"
                decoding="async"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'
                }}
              />
              <div className="hidden lg:block absolute left-6 bottom-6 max-w-3xl pr-6">
                <p className="text-sm md:text-base leading-relaxed text-white/95 bg-black/60 px-4 py-3 rounded-sm shadow-lg">
                  {activeTab.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
