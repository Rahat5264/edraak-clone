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

  const sectors = content?.sectors || { items: [] }
  const sector = sectors.items[activeSector] || { subtabs: [] }
  const activeIdx = activeSubTab[activeSector] || 0
  const activeItem = (sector.subtabs && sector.subtabs[activeIdx]) || {}
  const activeImages = Array.isArray((activeItem as any).images) ? ((activeItem as any).images as string[]) : []
  const thumbVisibleCount = 4
  const thumbHeight = 80 // matches h-20
  const thumbGap = 16 // matches gap-4
  const thumbContainerMaxHeight = thumbVisibleCount * thumbHeight + (thumbVisibleCount - 1) * thumbGap

  // keep a per-(sector,subtab) selected thumbnail index so each nested tab remembers its own thumbnail preview selection
  const [activePreviewIndexMap, setActivePreviewIndexMap] = useState<Record<string, number>>({})

  const hasGallery = activeImages.length > 0
  // Ensure main `image` is first in thumbnails (dedupe) so the main image appears at top of subimages
  let thumbnails: string[] = []
  if (activeItem.image) {
    if (hasGallery) {
      const imgs = activeImages
      thumbnails = [activeItem.image, ...imgs.filter((u: string) => u !== activeItem.image)]
    } else {
      thumbnails = [activeItem.image]
    }
  } else if (hasGallery) {
    thumbnails = activeImages
  } else {
    thumbnails = []
  }

  const key = `${activeSector}-${activeIdx}`
  const currentPreviewIndex = activePreviewIndexMap[key]
  const mainImageSrc = (typeof currentPreviewIndex === 'number' ? thumbnails[currentPreviewIndex] : (thumbnails[0] || activeItem.image || '/placeholder.jpg'))

  return (
    <section id="sectors" className="min-h-screen flex items-start px-4 bg-white pt-4 sm:pt-16 pb-4 sm:pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-left mb-8 text-black">{sectors.title || ''}</h2>

        {/* Main tabs */}
        <div className="flex items-end gap-1 mb-0 border-b border-gray-300 mx-0 px-0 pb-0 overflow-x-auto">
          {sectors.items.map((s: any, idx: number) => (
            <button
              key={idx}
              onClick={() => { setActiveSector(idx); setActiveSubTab(prev => ({ ...prev, [idx]: 0 })) }}
              className={`whitespace-nowrap mx-0.5 px-2 py-1 font-medium transition-all ${
                activeSector === idx ? 'text-[#02879F]' : 'text-gray-600 hover:text-[#02879F]'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Nested tabs: mobile = horizontally scrollable; sm+ = evenly distributed grid */}
        {(() => {
          const nestedTabs = (sectors.items[activeSector] && sectors.items[activeSector].subtabs) || []
          return (
            <>
              <div className="sm:hidden mb-1 mx-0 px-0 overflow-x-auto">
                <div className="flex space-x-0">
                  {nestedTabs.map((subtab: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubTabClick(activeSector, idx)}
                      className={`inline-block px-4 py-2 text-sm font-medium transition-all ${
                        activeIdx === idx ? 'bg-[#02879F] text-white border border-[#02879F]' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {subtab.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block mb-1 mx-0 px-0">
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${nestedTabs.length || 1}, minmax(0, 1fr))`, gap: 0 }}>
                  {nestedTabs.map((subtab: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubTabClick(activeSector, idx)}
                      className={`w-full px-4 py-2 border-none text-sm font-medium transition-all ${
                        activeIdx === idx ? 'bg-[#02879F] text-white border border-[#02879F]' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {subtab.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )
        })()}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold mb-4">{activeItem.name}</h3>
              <p className="text-black text-lg leading-relaxed mb-6">{activeItem.content}</p>
              <Button asChild size="lg" className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white">
                <a href="/contact">{content.sectors.cta}</a>
              </Button>
            </div>
          </div>

          {/* Right: smaller main image + vertical thumbnails on the right with scrollbar */}
          <div className="md:col-span-6">
            <div className="flex gap-6 items-start">
              <div className="flex-1 rounded-lg overflow-hidden bg-gray-50">
                <img src={mainImageSrc} alt={activeItem.name} className="w-full h-64 md:h-80 object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
              </div>

              <div
                className="w-20 md:w-24 flex flex-col gap-4 overflow-y-auto pr-2"
                style={thumbnails.length > thumbVisibleCount ? { maxHeight: `${thumbContainerMaxHeight}px` } : undefined}
              >
                  {thumbnails.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActivePreviewIndexMap(prev => ({ ...prev, [key]: i }))}
                      className={`block rounded-md overflow-hidden bg-white ${currentPreviewIndex === i ? 'ring-2 ring-[#02879F]' : ''}`}>
                      <img src={img} alt={`${activeItem.name}-${i}`} className="w-full h-20 object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
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
