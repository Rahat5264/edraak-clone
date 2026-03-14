'use client'

import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { useEffect, useRef } from 'react'

export default function VisionSystem() {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let rafId: number
    const speed = 0.8 // pixels per frame, tweakable

    function step() {
      if (!el) return
      // horizontal scroll and loop when half (since items duplicated)
      el.scrollLeft = el.scrollLeft + speed
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])
  return (
    <section id="vision" className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{content.visionSystem.title}</h2>

        <div className="max-w-3xl mx-auto text-gray-600 mb-8 text-lg leading-relaxed">
          {Array.isArray(content.visionSystem.description)
            ? content.visionSystem.description.map((para: string, i: number) => (
                <p key={i} className={i === content.visionSystem.description.length - 1 ? '' : 'mb-4'}>
                  {para}
                </p>
              ))
            : <p>{content.visionSystem.description}</p>
          }
        </div>

        <div className="mx-auto w-full md:w-3/4 lg:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-video bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              src={content.visionSystem.videoUrl}
              title="Edraak Vision System"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-left">
          <p className="text-center text-gray-700 mb-6">Our vision system combines high-speed capture with AI analysis to detect defects early and improve yield. Key capabilities are listed below.</p>

          <div className="flex justify-center mb-6">
            <div className="w-screen max-w-none -mx-4 md:-mx-8 bg-white rounded-none shadow-sm overflow-hidden border-t border-b border-gray-200">
              <div className="h-10 md:h-12 relative">
                <div
                  ref={scrollRef}
                  id="vision-keypoints"
                  className="absolute inset-0 overflow-hidden"
                >
                  <div className="flex items-center h-full px-10 md:px-16 space-x-12 whitespace-nowrap">
                    <div className="inline-flex items-center space-x-12">
                      {content.visionSystem.features.map((feature: string, idx: number) => (
                        <div key={idx} className="inline-flex items-center gap-3">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
                          <span className="text-sm text-primary leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* duplicate for smooth looping */}
                    <div className="inline-flex items-center space-x-12">
                      {content.visionSystem.features.map((feature: string, idx: number) => (
                        <div key={`dup-${idx}`} className="inline-flex items-center gap-3">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
                          <span className="text-sm text-primary leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA removed per request */}
        </div>
      </div>
    </section>
  )
}


