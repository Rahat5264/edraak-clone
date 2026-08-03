import Link from 'next/link'
import { fetchPosts } from '@/lib/wordpress'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

export default async function BlogSection() {
  const posts = await fetchPosts(1, 3)

  if (posts.length === 0) return null

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

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imageUrl = (post as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url
              || (post as any)._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url
              || null

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={imageUrl || ''}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between" style={{ backgroundColor: '#05032A' }}>
                  <div>
                    <p className="text-sm text-slate-300 mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title.rendered}</h3>
                    <p className="text-sm text-slate-200 leading-relaxed line-clamp-3">
                      {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                  <span className="mt-6 inline-block px-4 py-2 bg-white text-black text-sm w-fit">
                    Read more
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

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
