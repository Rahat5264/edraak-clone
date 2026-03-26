'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export default function Careers() {
  const [visible, setVisible] = useState(true)
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
    // hide careers section on the /products page
    try {
      const path = window.location && window.location.pathname
      if (typeof path === 'string' && (path.startsWith('/products') || path.startsWith('/privacy-policy') || path.startsWith('/terms-and-conditions'))) {
        setVisible(false)
      }
    } catch (e) {
      // ignore
    }

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

  if (!visible) return null

  const careers = content.careers

  return (
    <section
      aria-label="Careers"
      className="relative overflow-hidden bg-white"
      style={isDesktop ? { height: `${footerHeight}px` } : undefined}
    >
      <div className="relative h-full w-full px-4">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 py-6 md:py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">{careers.title}</h2>

          <div className="md:justify-self-end w-full max-w-md md:max-w-lg">
            <p className="text-base md:text-lg leading-relaxed text-black">
              {careers.description}
            </p>
            <Button asChild className="mt-4 bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white" size="lg">
              <a href={careers.ctaHref} className="inline-flex w-full sm:w-auto items-center justify-center px-6">{careers.ctaLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
