"use client"

import { useEffect } from 'react'
import VideoFrame from '@/components/ui/VideoFrame'
import Link from 'next/link'
import { Button } from '../ui/button'
import content from '@/data/content.json'

export default function Hero() {
  const raw = content.hero?.videoUrl || ''
  const isMp4 = /\.mp4(\?|$)/i.test(raw)
  const sep = raw.includes('?') ? '&' : '?'
  const src = raw ? (isMp4 ? raw : `${raw}${sep}autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`) : ''

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  return (
    <>
    <section
      className="relative flex flex-col overflow-hidden px-4 md:px-12 lg:px-24 bg-gradient-to-tr from-[#02879F] to-[#02E3DF] h-[calc(100vh_-_8rem)] md:h-[calc(100vh_-_10rem)] lg:h-[calc(100vh_-_10rem)]"
      // style={{ height: 'calc(var(--vh, 1vh) * 100 - var(--hero-bar-height) - var(--hero-offset) - var(--hero-extra-reduce, 0px))' }}
    >
      <div
        className="flex-1 flex items-center w-full md:py-12 lg:py-24"
      >
        <div
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-auto mt-6 sm:mt-0 pb-12 sm:pb-0"
        >
          <div className="lg:col-span-7 px-4 lg:px-8 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] leading-tight tracking-tight text-white font-extrabold">
              <span className="block">{content.hero.title}</span>
              <span className="block mt-2 text-lg sm:text-xl md:text-2xl lg:text-[48px] font-semibold">{content.hero.subtitle}</span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-white text-sm sm:text-base md:text-lg leading-relaxed">
              {content.hero.description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 items-center">
              <a href={content.hero.primaryCtaHref} className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-2.5 rounded shadow-sm font-medium">{content.hero.primaryCtaLabel}</a>
              <a href={content.hero.secondaryCtaHref} className="inline-block bg-white/90 text-slate-900 px-6 sm:px-8 py-2.5 rounded shadow-sm font-medium">{content.hero.secondaryCtaLabel}</a>
            </div>
          </div>

          <div className="lg:col-span-5 px-4 lg:px-8 flex justify-center lg:justify-end">
            <VideoFrame src={src} title={content.hero.videoTitle} shadow={false} />
          </div>
        </div>
      </div>

    </section>

    {/* For mobile show a 2 rem high signup bar */}
    <div className="sm:hidden w-full bg-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-900 font-medium">
          {content.hero.signup.title}
        </div>

      <Button asChild size="sm" className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white">
        <Link href={content.hero.signup.buttonHref}>
          {content.hero.signup.buttonLabel}
        </Link>
        </Button>
      </div>
    </div>

    {/* Newsletter bar: placed outside the hero so hero ends above it */}
    <div className="w-full bg-gray-100 relative z-30">
      <div className="hidden max-w-7xl mx-auto p-4 sm:p-6 sm:flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
            alt="Newsletter"
            className="w-16 sm:w-20 md:w-24 h-10 sm:h-14 md:h-16 object-cover rounded-sm flex-shrink-0"
          />
          <div className="text-left">
            <div className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">{content.hero.signup.title}</div>
            <div className="text-xs sm:text-sm md:text-base text-slate-700">{content.hero.signup.description}</div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <a href={content.hero.signup.buttonHref} className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-2 rounded shadow font-medium">{content.hero.signup.buttonLabel}</a>
        </div>
      </div>
    </div>
    </>
  )
}
