import BlogGrid from '@/components/blog/BlogGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Edraak Systems',
  description: 'Latest insights on textile quality control, AI manufacturing, traceability, and Industry 4.0 solutions.',
  openGraph: {
    title: 'Blog | Edraak Systems',
    description: 'Latest insights on textile quality control, AI manufacturing, traceability, and Industry 4.0 solutions.',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">Blog</h1>
          <p className="mt-4 text-base text-black max-w-3xl">
            Insights on textile quality control, AI-driven manufacturing, traceability, and Industry 4.0 solutions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <BlogGrid perPage={20} />
      </section>
    </div>
  )
}
