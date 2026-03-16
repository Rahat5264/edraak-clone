'use client'

import content from '@/data/content.json'
import { Button } from '@/components/ui/button'

export default function Solutions() {
  return (
    <section id="solutions" className="min-h-screen flex items-center px-4 bg-white">
      <div className="max-w-7xl mx-auto w-full py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-8 text-black">{content.solutions.title}</h2>
        {content.solutions.barImage && (
          <div className="mt-4 md:mt-6 mb-6 md:mb-8">
            <div className="max-w-5xl overflow-hidden rounded-lg shadow-lg bg-teal-400">
              <img src={content.solutions.barImage} alt="solutions illustration" className="w-full h-auto object-contain" />
            </div>
          </div>
        )}

        {Array.isArray(content.solutions.description) ? (
          content.solutions.description.map((d: any, i: number) => (
            <p key={i} className={`text-left text-black ${i === content.solutions.description.length - 1 ? 'mb-8' : 'mb-4'} max-w-3xl text-lg leading-relaxed`}>
              {d}
            </p>
          ))
        ) : (
          <p className="text-left text-black mb-8 max-w-3xl text-lg leading-relaxed">{content.solutions.description}</p>
        )}

        <div className="flex justify-start">
          <Button asChild size="lg" className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white">
            <a href="#contact">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
