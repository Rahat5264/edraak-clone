"use client"

import { FormEvent, useEffect } from 'react'
import VideoFrame from '@/components/ui/VideoFrame'
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

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

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
            <p className="text-base sm:text-lg md:text-xl text-white/90 tracking-wide">
              {content.hero.subtitle}
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] lg:text-[56px] leading-tight tracking-tight text-white font-normal">
              <span className="font-extrabold">Intelligent Systems</span> to make your production lines <span className="font-extrabold">Efficient</span>
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

    {/* Mobile newsletter bar: keep previous simple layout */}
    <div className="sm:hidden w-full bg-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-900 font-medium">
          {content.hero.signup.title}
        </div>

        <a
          href={content.hero.signup.buttonHref}
          className="inline-flex h-9 px-4 items-center justify-center bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white text-sm font-medium"
        >
          {content.hero.signup.buttonLabel}
        </a>
      </div>
    </div>

    {/* Desktop newsletter bar: placed outside the hero so hero ends above it */}
    <div className="hidden sm:block w-full bg-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
            alt="Newsletter"
            className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-sm shrink-0"
            loading="lazy"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'
            }}
          />
          <div className="text-left min-w-0">
            <div className="text-base sm:text-xl font-bold text-slate-900 leading-tight">{content.hero.signup.title}</div>
            <div className="text-sm sm:text-lg text-slate-700 leading-tight">{content.hero.signup.description}</div>
          </div>
        </div>

        <form
          onSubmit={handleNewsletterSubmit}
          className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
        >
          <input
            type="email"
            required
            placeholder="enter email to subscribe"
            className="h-11 sm:h-12 w-full sm:w-72 lg:w-80 bg-white border border-gray-200 px-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 outline-none"
          />
          <button
            type="submit"
            className="h-11 sm:h-12 px-6 sm:px-7 bg-white text-slate-900 font-semibold text-sm sm:text-base whitespace-nowrap"
          >
            {content.hero.signup.buttonLabel} →
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
