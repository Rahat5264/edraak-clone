'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import content from '@/data/content.json'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDim, setIsDim] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!navRef.current) return

    let ticking = false

    const getEffectiveBg = (el: Element | null): {bgImage: string | null, bgColor: string | null} => {
      let node: any = el
      while (node) {
        const style = window.getComputedStyle(node)
        const bgImage = style.backgroundImage || null
        const bgColor = style.backgroundColor || null
        if (bgImage && bgImage !== 'none') return { bgImage, bgColor }
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') return { bgImage: null, bgColor }
        node = node.parentElement
      }
      return { bgImage: null, bgColor: null }
    }

    const check = () => {
      const nav = navRef.current!
      const rect = nav.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.bottom + 5
      const el = document.elementFromPoint(x, Math.min(y, window.innerHeight - 1))
      const info = getEffectiveBg(el)

      if (info.bgImage) {
        setIsDim(false)
        return
      }

      if (!info.bgColor) {
        setIsDim(false)
        return
      }

      // parse rgb/rgba
      const match = info.bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/)
      if (!match) {
        setIsDim(false)
        return
      }

      const r = Number(match[1]), g = Number(match[2]), b = Number(match[3])
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      // if very bright (near white) then dim header
      setIsDim(brightness > 230)
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          check()
          ticking = false
        })
        ticking = true
      }
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 site-header transition-opacity duration-200`}
      style={{ opacity: isDim ? 0.85 : 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="font-semibold text-lg">
              {content.brand.name}
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium transition-colors" style={{color: 'rgba(255,255,255,0.9)'}}>
                {item.label}
              </a>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 pt-4">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="block text-sm font-medium py-2" style={{color: 'rgba(255,255,255,0.95)'}}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
