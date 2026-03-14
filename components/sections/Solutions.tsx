'use client'

import content from '@/data/content.json'
import { Button } from '@/components/ui/button'

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 md:py-28 px-4 bg-white min-h-[28rem] md:min-h-[36rem]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">{content.solutions.title}</h2>
        {Array.isArray(content.solutions.description) ? (
          content.solutions.description.map((d: any, i: number) => (
            <p key={i} className={`text-center text-gray-600 ${i === content.solutions.description.length - 1 ? 'mb-12' : 'mb-6'} max-w-3xl mx-auto text-lg leading-relaxed`}>
              {d}
            </p>
          ))
        ) : (
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">{content.solutions.description}</p>
        )}

        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl w-full">
          {content.solutions.items.slice(0, 8).map((item: any, idx: number) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:border-primary/20 transition-colors text-center">
              <div className="text-sm font-bold text-primary mb-1">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="font-medium text-xs mb-1 truncate">{item.title}</h3>
              <p className="text-[11px] text-gray-500">{item.stage}</p>
            </div>
          ))}
          </div>
        </div>

        {content.solutions.barImage && (
          <div className="mt-6 md:mt-8 bg-primary rounded-lg p-4">
            <div className="overflow-hidden rounded">
              <img src={content.solutions.barImage} alt="solutions bar" className="w-full h-48 md:h-72 object-cover rounded-md shadow-md" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
