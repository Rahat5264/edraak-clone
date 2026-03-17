'use client'

import content from '@/data/content.json'
import { Button } from '@/components/ui/button'

export default function Solutions() {
  return (
    <section id="solutions" className="h-screen flex items-center px-4 bg-[#02879F]">
      <div className="max-w-7xl mx-auto w-full py-8 md:pt-22 md:pb-8 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-8 text-white">{content.solutions.title}</h2>
        {content.solutions.barImage && (
          <div className="mt-4 md:mt-6 mb-6 md:mb-8 w-full">
            <div className="w-full bg-[#02879F]">
              <div className="max-w-5xl mx-auto max-h-[40vh] px-4">
                <img src={content.solutions.barImage} alt="solutions illustration" className="w-full h-auto max-h-[30vh] object-contain mx-auto bg-transparent" />
              </div>
            </div>
          </div>
        )}

        {Array.isArray(content.solutions.description) ? (
          content.solutions.description.map((d: any, i: number) => (
            <p key={i} className={`text-left text-white ${i === content.solutions.description.length - 1 ? 'mb-8' : 'mb-4'} max-w-3xl text-base md:text-lg leading-relaxed`}>
              {d}
            </p>
          ))
        ) : (
          <p className="text-left text-white mb-8 max-w-3xl text-lg leading-relaxed">{content.solutions.description}</p>
        )}

        <div className="flex justify-start">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 border border-white">
            <a href="#contact">{content.solutions.cta}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
