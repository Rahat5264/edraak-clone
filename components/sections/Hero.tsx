"use client"

import { useEffect } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import content from '@/data/content.json'

export default function Hero() {
  const raw = content.visionSystem?.videoUrl || ''
  const sep = raw.includes('?') ? '&' : '?'
  const src = raw ? `${raw}${sep}autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1` : ''

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  return (
    <section
      className="relative flex flex-col overflow-hidden px-4 md:px-12 lg:px-24 bg-gradient-to-r from-teal-400 to-teal-600"
      style={{ height: 'calc(var(--vh, 1vh) * 100 - var(--hero-offset))' }}
    >
      <div
        className="flex-1 flex items-center w-full min-h-0"
        style={{ height: 'calc(var(--vh, 1vh) * 100 - var(--hero-bar-height) - var(--hero-offset))' }}
      >
        <div
          className="max-w-7xl mx-auto w-full min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-auto"
          style={{ maxHeight: 'calc(var(--vh, 1vh) * 100 - var(--hero-bar-height) - var(--hero-offset))' }}
        >
          <div className="lg:col-span-7 px-4 lg:px-8 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] leading-tight tracking-tight text-slate-900 font-extrabold">
              <span className="block">Traceability &amp; Quality</span>
              <span className="block mt-2 text-lg sm:text-xl md:text-2xl lg:text-[48px] font-semibold">across you manufacturing process</span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-slate-900 text-sm sm:text-base md:text-lg leading-relaxed">
              Connect all of you equipment, capture all real-time updates, Use cameras &amp; Sensors for autonomous data acquisition process.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 items-center">
              <a href="#" className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-2.5 rounded shadow-sm font-medium">View Product</a>
              <a href="#contact" className="inline-block bg-white/90 text-slate-900 px-6 sm:px-8 py-2.5 rounded shadow-sm font-medium">Contact Us</a>
            </div>
          </div>

          <div className="lg:col-span-5 px-4 lg:px-8 flex justify-center lg:justify-end">
            <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden">
              <AspectRatio ratio={16 / 9} className="w-full">
                <iframe
                  src={src}
                  title="Product video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter bar: absolutely positioned inside the hero so it always shows */}
      <div className="absolute left-0 bottom-0 w-full bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] sm:h-[72px] md:h-[88px] lg:h-[104px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
              alt="Newsletter"
              className="w-16 sm:w-20 md:w-24 h-10 sm:h-14 md:h-16 object-cover rounded-sm flex-shrink-0"
            />
            <div className="text-left">
              <div className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">Sign Up now to get latest updates</div>
              <div className="text-xs sm:text-sm md:text-base text-slate-700">Get a chance to see industry leaders talk about implementations</div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <a href="#" className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-2 rounded shadow font-medium">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
  )
}
