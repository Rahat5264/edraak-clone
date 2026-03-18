'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import content from '@/data/content.json'

type CaseStudyItem = {
  title: string
  description: string
  image?: string
}

export default function IndustrialUseCases() {
  const items = useMemo(() => (content.caseStudies.items || []) as CaseStudyItem[], [])
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      const cards = Array.from(container.querySelectorAll('[data-usecase-card]')) as HTMLElement[]
      if (!cards.length) return

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      const containerLeft = container.getBoundingClientRect().left

      cards.forEach((card, index) => {
        const cardLeft = card.getBoundingClientRect().left
        const distance = Math.abs(cardLeft - containerLeft)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      setActiveIndex(nearestIndex)
    }

    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goToSlide = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll('[data-usecase-card]')) as HTMLElement[]
    const target = cards[index]
    if (!target) return

    container.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth',
    })
  }

  return (
    <section id="industrial-use-cases" className="px-4 py-7 sm:py-9 bg-muted/40 scroll-mt-11 md:scroll-mt-15">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold mb-6 text-[var(--site-header-bg)]">{content.caseStudies.title}</h2>

        <div
          ref={scrollRef}
          className="flex items-start gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Industrial use case carousel"
        >
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              data-usecase-card
              className="snap-start shrink-0 w-[calc(100vw-2rem)] sm:w-[540px] md:w-[420px] lg:w-[390px] h-[70vh] max-h-[540px] min-h-[410px] bg-white overflow-hidden"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[58%] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'
                  }}
                />
              ) : (
                <div className="w-full h-[58%] bg-zinc-300" />
              )}

              <div className="h-[42%] bg-[var(--site-header-bg)] text-white p-4 sm:p-5 overflow-hidden">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-lg sm:text-xl leading-snug text-white/95 line-clamp-4">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3" role="tablist" aria-label="Use case navigation">
          {items.map((item, index) => (
            <button
              key={`dot-${item.title}-${index}`}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                activeIndex === index ? 'bg-[var(--site-header-bg)]' : 'bg-[var(--site-header-bg)]/35'
              }`}
              aria-label={`Go to use case ${index + 1}`}
              aria-current={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
