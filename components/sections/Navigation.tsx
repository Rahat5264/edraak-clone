"use client"

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import content from '@/data/content.json'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDim, setIsDim] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()
  const [hash, setHash] = useState('')
  const router = useRouter()
  const [activeHref, setActiveHref] = useState('')
  const [userClickedAnchor, setUserClickedAnchor] = useState(false)

  const navItems = (content.navigation || []).filter((it: any) => {
    const label = (it.label || '').toString().trim().toLowerCase()
    return label !== 'blog'
  })

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

  useEffect(() => {
    const setCurrentHash = () => setHash(window.location.hash || '')
    setCurrentHash()
    window.addEventListener('hashchange', setCurrentHash)

    // set activeHref when pathname or hash changes
    const setCurrentActive = () => {
      try {
        const current = `${window.location.pathname}${window.location.hash || ''}`
        // If we are at root with no hash and the user hasn't clicked an anchor, show no active
        if (window.location.pathname === '/' && !(window.location.hash || '') && !userClickedAnchor) {
          setActiveHref('')
        // If the user just clicked an anchor on the same page, don't override the activeHref we set in the click handler
        } else if (window.location.pathname === '/' && !(window.location.hash || '') && userClickedAnchor) {
          return
        } else {
          setActiveHref(current)
        }
      } catch (e) {
        setActiveHref(`${pathname}${hash}`)
      }
    }
    setCurrentActive()
    // update active on route/hash changes
    const onRouteChange = () => setCurrentActive()
    window.addEventListener('popstate', onRouteChange)

    return () => {
      window.removeEventListener('hashchange', setCurrentHash)
      window.removeEventListener('popstate', onRouteChange)
    }
  }, [userClickedAnchor])

  // keep activeHref in sync with route changes (fallback when observer not active)
  useEffect(() => {
    if (pathname === '/' && !hash && !userClickedAnchor) {
      setActiveHref('')
    // When the user clicked an anchor on the same page we may not have a hash in the URL
    // yet (we scroll manually). Don't override the manually-set activeHref in that case.
    } else if (pathname === '/' && !hash && userClickedAnchor) {
      return
    } else {
      setActiveHref(`${pathname}${hash}`)
    }
  }, [pathname, hash, userClickedAnchor])

  const normalizeHref = (h: string) => {
    if (!h) return '/'
    try {
      const parts = h.split('#')
      let p = parts[0] || '/'
      if (!p.startsWith('/')) p = `/${p}`
      if (p !== '/' && p.endsWith('/')) p = p.replace(/\/+$|\/+$/g, '')
      const hashPart = parts[1] ? `#${parts[1]}` : ''
      return `${p}${hashPart}`
    } catch (e) {
      return h
    }
  }

  const scrollToIdWithOffset = (id: string, behavior: ScrollBehavior = 'smooth') => {
    if (typeof window === 'undefined') return false
    const el = document.getElementById(id)
    if (!el) return false
    const nav = navRef.current
    const headerHeight = nav ? nav.getBoundingClientRect().height : 0
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top: Math.max(0, y), behavior })
    return true
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleHash = () => {
      const h = window.location.hash || ''
      if (!h) return
      const id = h.replace('#', '')
      setTimeout(() => {
        scrollToIdWithOffset(id)
      }, 50)
    }

    // run once on mount if there's a hash
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Intersection observer to detect in-view sections and set live active link
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathname === '/' && !userClickedAnchor) return
    const toObserve: HTMLElement[] = []

    navItems.forEach((item: any) => {
      const raw = item.href || ''
      if (!raw.includes('#')) return
      const id = raw.split('#')[1]
      if (!id) return
      const el = document.getElementById(id)
      if (el) toObserve.push(el)
    })

    if (toObserve.length === 0) return

    // choose the section with the largest intersectionRatio
    const io = new IntersectionObserver((entries) => {
      let best: IntersectionObserverEntry | null = null
      entries.forEach(entry => {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry
      })
      if (best && best.isIntersecting) {
        const id = best.target.id
        const match = navItems.find((it: any) => (it.href || '').includes(`#${id}`))
        if (match) {
          const raw = match.href || ''
          const parts = raw.split('#')
          const path = parts[0] || '/'
          const hashPart = parts[1] ? `#${parts[1]}` : ''
          setActiveHref(`${path}${hashPart}`)
        }
      }
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] })

    toObserve.forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [pathname])

  // Additional scroll-based fallback: pick section whose top is closest to viewport top
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathname === '/' && !userClickedAnchor) return
    const sectionIds = navItems.map((it: any) => {
      const raw = it.href || ''
      if (!raw.includes('#')) return null
      const parts = raw.split('#')
      return parts[1] || null
    }).filter(Boolean) as string[]

    if (sectionIds.length === 0) return

    const headerHeight = navRef.current ? navRef.current.getBoundingClientRect().height : 0
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        let bestId: string | null = null
        let bestDistance = Number.POSITIVE_INFINITY
        sectionIds.forEach(id => {
          const el = document.getElementById(id)
          if (!el) return
          const rect = el.getBoundingClientRect()
          const distance = Math.abs(rect.top - headerHeight) // use header height as reference
          if (distance < bestDistance) {
            bestDistance = distance
            bestId = id
          }
        })

        if (bestId) {
          const match = navItems.find((it: any) => (it.href || '').includes(`#${bestId}`))
          if (match) {
            const raw = match.href || ''
            const parts = raw.split('#')
            const path = parts[0] || '/'
            const hashPart = parts[1] ? `#${parts[1]}` : ''
            setActiveHref(`${path}${hashPart}`)
          }
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // run once
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 site-header transition-opacity duration-200`}
      style={{ opacity: isDim ? 0.85 : 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center font-semibold text-[24px]">
              <img src={content.brand.logo || '/icon.svg'} alt={content.brand.name} className="h-8 w-auto mr-3" />
              {content.brand.name}
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const raw = item.href || ''
              let targetPath = raw
              let targetHash = ''
              if (raw.includes('#')) {
                const parts = raw.split('#')
                targetPath = parts[0] || '/'
                targetHash = parts[1] ? `#${parts[1]}` : ''
              }

              const linkHref = `${targetPath}${targetHash}`
              const isActive = normalizeHref(activeHref) === normalizeHref(linkHref)
              const isVision = (item.label || '').toString().trim().toLowerCase() === 'vision platform' || (targetPath || '').toLowerCase() === '/vision-platform'

              const handleClick = async (e: React.MouseEvent) => {
                setUserClickedAnchor(true)
                setActiveHref(linkHref)
                const id = targetHash.replace('#', '')
                // If already on the target path
                if ((targetPath === '' ? '/' : targetPath) === pathname) {
                  if (targetHash) {
                    e.preventDefault()
                    const scrolled = scrollToIdWithOffset(id)
                    if (scrolled) {
                      setActiveHref(linkHref)
                    } else {
                      window.location.hash = targetHash
                      setActiveHref(linkHref)
                    }
                  }
                  return
                }

                // Not on target path: navigate then scroll after a short delay
                e.preventDefault()
                try {
                  router.push(linkHref)
                } catch (err) {
                  // fallback: set location
                  window.location.href = linkHref
                }

                if (targetHash) {
                  setTimeout(() => {
                    const scrolled = scrollToIdWithOffset(id)
                    if (!scrolled) window.location.hash = targetHash
                  }, 250)
                }
              }

              // For Vision Platform: disable navigation and show a hover tooltip (desktop) / inline label (mobile)
              if (isVision) {
                return (
                  <div key={item.label} className="relative inline-block group">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); /* intentionally disabled */ }}
                      className={`text-sm md:text-base text-white/85 hover:text-white transition-colors ${isActive ? 'active' : ''} vision-link`}
                      style={{ background: 'transparent', border: 0, padding: 0 }}
                    >
                      {item.label}
                    </button>
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-black text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      Coming soon
                    </div>
                  </div>
                )
              }

                return (
                <Link
                  key={item.label}
                  href={linkHref}
                  className={`text-sm md:text-base text-white/85 hover:text-white transition-colors ${isActive ? 'active' : ''}`}
                  onClick={handleClick}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

          {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 pt-4">
            {navItems.map((item) => {
              const raw = item.href || ''
              let targetPath = raw
              let targetHash = ''
              if (raw.includes('#')) {
                const parts = raw.split('#')
                targetPath = parts[0] || '/'
                targetHash = parts[1] ? `#${parts[1]}` : ''
              }

              const mobileLinkHref = `${targetPath}${targetHash}`
              const isActive = normalizeHref(activeHref) === normalizeHref(mobileLinkHref)
              const isVision = (item.label || '').toString().trim().toLowerCase() === 'vision platform' || (targetPath || '').toLowerCase() === '/vision-platform'

              const handleClick = (e: React.MouseEvent) => {
                setMobileMenuOpen(false)
                setUserClickedAnchor(true)
                setActiveHref(mobileLinkHref)
                const id = targetHash.replace('#', '')

                if (targetPath === pathname && targetHash) {
                  e.preventDefault()
                  const scrolled = scrollToIdWithOffset(id)
                  if (!scrolled) window.location.hash = targetHash
                  return
                }

                if (targetHash) {
                  e.preventDefault()
                  try {
                    router.push(mobileLinkHref)
                  } catch (err) {
                    window.location.href = mobileLinkHref
                  }

                  setTimeout(() => {
                    const scrolled = scrollToIdWithOffset(id)
                    if (!scrolled) window.location.hash = targetHash
                  }, 250)
                }
              }

              if (isVision) {
                return (
                  <div key={item.label} className="block text-sm md:text-base text-white/85 hover:text-white font-normal py-2 vision-link" style={{ fontSize: '18px' }}>
                    <span>{item.label}</span>
                    <span className="ml-2 text-xs text-slate-400">Coming soon</span>
                  </div>
                )
              }

                return (
                <Link
                  key={item.label}
                  href={`${targetPath}${targetHash}`}
                  onClick={handleClick}
                  className={`block text-sm md:text-base text-white/85 hover:text-white py-2 ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
