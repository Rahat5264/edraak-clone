import Link from 'next/link'
import BlogGrid from '@/components/blog/BlogGrid'

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold" style={{ color: '#05032A' }}>Newsletter &amp; Blogs</h2>
            <p className="text-gray-600 mt-2">Latest insights and updates from Edraak Systems</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center font-medium transition-colors" style={{ color: '#020026' }}
          >
            View all posts
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <BlogGrid perPage={3} />

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View all posts
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
