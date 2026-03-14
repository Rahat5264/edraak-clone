'use client'

import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import content from '@/data/content.json'

export default function Hero() {
  return (
    <section className="bg-primary text-white min-h-screen flex items-center px-4 py-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="px-2 sm:px-4 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words">
            {content.hero.title}
          </h1>
          <p className="w-full text-xl sm:text-2xl md:text-3xl font-semibold leading-snug max-w-xl mt-4">
            {content.hero.subtitle}
          </p>
          <p className="text-sm md:text-base font-medium mb-2 max-w-xl opacity-95 mt-4">
            {content.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start w-full mt-6">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white hover:text-primary font-semibold">
              <a href="https://calendly.com/your-temp-link" target="_blank" rel="noopener noreferrer">
                {content.hero.cta}
              </a>
            </Button>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm mt-8 opacity-75 flex items-center gap-2 cursor-pointer bg-transparent border-0"
            aria-label="Scroll to Vision System"
          >
            {content.hero.note}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="px-2 sm:px-4 flex justify-center md:justify-end">
          <div className="w-full max-w-3xl md:max-w-2xl lg:max-w-3xl bg-white/5 rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-1 transform transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative rounded-xl overflow-hidden">
              <AspectRatio ratio={16 / 9} className="w-full">
                {
                  (() => {
                    const raw = content.visionSystem?.videoUrl || ''
                    const sep = raw.includes('?') ? '&' : '?'
                    const src = raw ? `${raw}${sep}autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1` : ''
                    return (
                      <iframe
                        src={src}
                        title="Product video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    )
                  })()
                }
              </AspectRatio>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              <div className="pointer-events-none absolute -bottom-6 left-4 w-36 h-36 rounded-full blur-3xl bg-primary/30 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
