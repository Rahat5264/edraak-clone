'use client'

import { Card, CardDescription } from '@/components/ui/card'
import content from '@/data/content.json'

export default function Technology() {
  return (
    <section id="technology" className="py-20 md:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">{content.technology.title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">{content.technology.description}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.technology.items.map((tech: any, idx: number) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-primary mb-3">{tech.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>

              {tech.image && (
                <a href={tech.link || '#'} target="_blank" rel="noopener noreferrer" className="block mt-4">
                  <div className="w-full h-40 md:h-44 overflow-hidden rounded-md">
                    <img src={tech.image} alt={tech.title} className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }} />
                  </div>
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
