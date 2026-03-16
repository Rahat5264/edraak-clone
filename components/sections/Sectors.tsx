'use client'

import { useState, useEffect } from 'react'
import content from '@/data/content.json'
import { Button } from '@/components/ui/button'

export default function Sectors() {
  const [activeSector, setActiveSector] = useState(0)
  const [activeSubTab, setActiveSubTab] = useState<{ [key: number]: number }>({})

  const handleSubTabClick = (sectorIndex: number, subTabIndex: number) => {
    setActiveSubTab(prev => ({ ...prev, [sectorIndex]: subTabIndex }))
  }

  const sector = content.sectors.items[activeSector]
  const activeIdx = activeSubTab[activeSector] || 0
  const activeItem = sector.subtabs[activeIdx]
  const thumbVisibleCount = 4
  const thumbHeight = 80 // matches h-20
  const thumbGap = 16 // matches gap-4
  const thumbContainerMaxHeight = thumbVisibleCount * thumbHeight + (thumbVisibleCount - 1) * thumbGap
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [activeSector, activeIdx])

  const hasGallery = Array.isArray(activeItem.images) && activeItem.images.length > 0
  const thumbnails = hasGallery ? activeItem.images : sector.subtabs.map((t: any) => t.image)
  const mainImageSrc = hasGallery ? activeItem.images[activeImageIndex] : activeItem.image

  return (
    <section id="sectors" className="min-h-screen flex items-start px-4 bg-white py-16">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-left mb-8 text-black">{content.sectors.title}</h2>

        {/* Main tabs */}
        <div className="flex items-end gap-4 mb-4 border-b border-gray-200 -mx-2 px-2 pb-4 overflow-x-auto">
          {content.sectors.items.map((s: any, idx: number) => (
            <button
              key={idx}
              onClick={() => { setActiveSector(idx); setActiveSubTab(prev => ({ ...prev, [idx]: 0 })) }}
              className={`whitespace-nowrap mx-1 px-4 py-3 font-medium transition-all border-b-2 ${
                activeSector === idx ? 'text-teal-600 border-teal-600' : 'text-gray-600 border-transparent hover:text-teal-500'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Nested tabs (boxed, full-width, no scrollbar) */}
        <div className="flex flex-wrap gap-3 mb-6 -mx-1 px-1">
          {content.sectors.items[activeSector].subtabs.map((subtab: any, idx: number) => (
            <button
              key={idx}
              onClick={() => handleSubTabClick(activeSector, idx)}
              className={`mx-1 px-6 py-3 rounded-none text-sm font-medium transition-all ${
                activeIdx === idx ? 'bg-teal-600 text-white border border-teal-600' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {subtab.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold mb-4">{activeItem.name}</h3>
              <p className="text-black text-lg leading-relaxed mb-6">{activeItem.content}</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white">
                <a href="#contact">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right: smaller main image + vertical thumbnails on the right with scrollbar */}
          <div className="md:col-span-6">
            <div className="flex gap-6 items-start">
              <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-gray-50">
                <img src={mainImageSrc} alt={activeItem.name} className="w-full h-64 md:h-80 object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
              </div>

              <div
                className="w-20 md:w-24 flex flex-col gap-4 overflow-y-auto pr-2"
                style={thumbnails.length > thumbVisibleCount ? { maxHeight: `${thumbContainerMaxHeight}px` } : undefined}
              >
                {hasGallery
                  ? thumbnails.map((img: string, i: number) => (
                      <button key={i} onClick={() => setActiveImageIndex(i)} className={`block rounded-md overflow-hidden bg-white ${activeImageIndex === i ? 'ring-2 ring-teal-400' : ''}`}>
                        <img src={img} alt={`${activeItem.name}-${i}`} className="w-full h-20 object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
                      </button>
                    ))
                  : sector.subtabs.map((t: any, i: number) => (
                      <button key={i} onClick={() => handleSubTabClick(activeSector, i)} className={`block rounded-md overflow-hidden bg-white ${activeIdx === i ? 'ring-2 ring-teal-400' : ''}`}>
                        <img src={t.image} alt={t.name} className="w-full h-20 object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
