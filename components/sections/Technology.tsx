'use client'

import { useMemo, useState } from 'react'
import content from '@/data/content.json'

export default function Technology() {
  const [activeIndex, setActiveIndex] = useState(0)

  const tabs = useMemo(() => {
    const labels = content.technology?.tabLabels || []

    const introText = content.visionSystem?.description?.[0] || content.technology.description
    const items = content.technology?.items || []
    const cameraImages = content.cameraIndustries?.images || []

    return labels.map((label, idx) => {
      const primaryImage = items[idx]?.image || cameraImages[idx] || '/placeholder.jpg'
      const secondaryImage =
        cameraImages[idx] ||
        items[(idx + 1) % (items.length || 1)]?.image ||
        '/placeholder.jpg'

      return {
        title: label,
        description: idx === 0 ? introText : items[idx]?.description || introText,
        images: [primaryImage, secondaryImage],
      }
    })
  }, [])

  const activeTab = tabs[activeIndex] || tabs[0]

  return (
    <section id="technology" className="bg-[var(--site-header-bg)] text-white px-4 py-12 md:py-16 md:min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">{content.technology.title}</h2>
        <p className="text-white/90 max-w-3xl text-base md:text-lg leading-relaxed">{content.visionSystem?.description?.[0] || content.technology.description}</p>

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

          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <p className="text-sm md:text-base leading-relaxed text-white/95 max-w-3xl">{activeTab.description}</p>

            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {activeTab.images.map((imageSrc, index) => (
                <div key={`${activeTab.title}-${index}`} className="overflow-hidden rounded-sm bg-white/10 aspect-[4/5] md:aspect-square">
                  <img
                    src={imageSrc}
                    alt={`${activeTab.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
