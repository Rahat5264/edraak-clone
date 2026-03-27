'use client'

import content from '@/data/content.json'
import { Button } from '@/components/ui/button'

export default function Solutions() {
  const s = content?.solutions || {};
  return (
    <section id="solutions" className="h-screen flex items-center px-4 bg-white">
      <div className="max-w-7xl mx-auto w-full py-8 md:pt-22 md:pb-8 flex flex-col justify-center">
        <p className="text-base md:text-[20px] text-black mb-2">
          {content?.solutions?.breadcrumbPrefix}
          <span className="font-extrabold">{content?.solutions?.breadcrumbHighlight}</span>
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-left mb-3 text-black">
          {s.title || ''}
        </h2>
        {content?.solutions?.barImage && (
          <div className="mt-2 md:mt-3 mb-6 md:mb-8 w-full">
            <div className="w-full bg-white">
              <div className="w-full">
                <img src={content.solutions.barImage} alt="solutions illustration" className="w-full h-16 md:h-20 lg:h-32 object-cover bg-transparent" />
              </div>
            </div>
          </div>
        )}

        {Array.isArray(s.description) ? (
          s.description.map((d: any, i: number) => (
            <p key={i} className={`text-left text-black ${i === (s.description?.length || 0) - 1 ? 'mb-8' : 'mb-4'} max-w-3xl text-base md:text-lg leading-relaxed`}>
              {d}
            </p>
          ))
        ) : (
          <p className="text-left text-black mb-8 max-w-3xl text-base md:text-lg leading-relaxed">{s.description}</p>
        )}

        <div className="flex flex-wrap items-center justify-start gap-4 md:gap-5">
          <Button asChild size="lg" className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white border-0 hover:opacity-95">
            <a href={s.ctaHref || '#'}>{s.cta || ''}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-black text-black bg-transparent hover:bg-black/5 hover:text-black">
            <a href={s.secondaryCtaHref || '#'}>{s.secondaryCta || ''}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
