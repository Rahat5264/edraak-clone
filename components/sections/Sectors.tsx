'use client'

import { useState } from 'react'
import content from '@/data/content.json'

export default function Sectors() {
  const [activeSector, setActiveSector] = useState(0)
  const [activeSubTab, setActiveSubTab] = useState<{ [key: number]: number }>({})

  const handleSubTabClick = (sectorIndex: number, subTabIndex: number) => {
    setActiveSubTab(prev => ({ ...prev, [sectorIndex]: subTabIndex }))
  }

  return (
    <section id="sectors" className="py-20 md:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">{content.sectors.title}</h2>

        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto md:flex-wrap -mx-2 px-2">
          {content.sectors.items.map((sector: any, idx: number) => (
            <button
              key={idx}
              onClick={() => { setActiveSector(idx); setActiveSubTab({ ...activeSubTab, [idx]: 0 }) }}
              className={`whitespace-nowrap mx-1 px-4 py-3 font-medium transition-all border-b-2 ${
                activeSector === idx ? 'text-primary border-primary' : 'text-gray-600 border-transparent hover:text-primary'
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Nested tabs: simple inner tabs for items of the active sector */}
        <div className="mt-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {content.sectors.items[activeSector].subtabs.map((subtab: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSubTabClick(activeSector, idx)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (activeSubTab[activeSector] || 0) === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subtab.name}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            {(() => {
              const activeIdx = activeSubTab[activeSector] || 0
              const item = content.sectors.items[activeSector].subtabs[activeIdx]
              return (
                (() => {
                  return (
                    <div className={`flex flex-col md:flex-row items-center gap-6`}>
                      <div className={`w-full md:w-1/2`}>
                        <h3 className="text-2xl font-semibold mb-3">{item.name}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.content}</p>
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full md:w-1/2 h-64 md:h-56 object-cover rounded-lg`}
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }}
                      />
                    </div>
                  )
                })()
              )
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}
