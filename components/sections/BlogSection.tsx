'use client'

import { Card, CardDescription } from '@/components/ui/card'
import content from '@/data/content.json'

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-center mb-12 text-primary">{content?.blog?.title}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(content?.blog?.items || []).map((post: any, idx: number) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-lg font-bold text-primary mb-3">{post.title}</h3>
                <CardDescription text={post.excerpt} className="text-gray-600 text-sm" wordLimit={23} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
