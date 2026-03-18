'use client'

import { useEffect, useState } from 'react'
import content from '@/data/content.json'

export default function Careers() {
  const [footerHeight, setFooterHeight] = useState(420)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')

    const syncBreakpoint = () => setIsDesktop(media.matches)
    syncBreakpoint()

    media.addEventListener('change', syncBreakpoint)
    return () => media.removeEventListener('change', syncBreakpoint)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const syncFooterHeight = () => {
      const nextHeight = Math.round(footer.getBoundingClientRect().height)
      if (nextHeight > 0) {
        setFooterHeight(nextHeight)
      }
    }

    syncFooterHeight()
    const observer = new ResizeObserver(syncFooterHeight)
    observer.observe(footer)

    window.addEventListener('resize', syncFooterHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncFooterHeight)
    }
  }, [])

  const careers = content.careers

  return (
    <section
      aria-label="Careers"
      className="relative overflow-hidden"
      style={isDesktop ? { height: `${footerHeight}px` } : undefined}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${careers.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative h-full w-full px-4">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 py-6 md:py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{careers.title}</h2>

          <div className="md:justify-self-end w-full max-w-md md:max-w-lg">
            <p className="text-base md:text-lg leading-relaxed text-white">
              {careers.description}
            </p>
            <a
              href={careers.ctaHref}
              className="mt-4 inline-flex h-11 w-full sm:w-auto min-w-44 px-6 items-center justify-center bg-white text-[#02879F] text-sm md:text-base font-semibold hover:opacity-95 transition-opacity"
            >
              {careers.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
