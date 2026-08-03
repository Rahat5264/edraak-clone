import Link from 'next/link'
import { fetchPosts } from '@/lib/wordpress'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Edraak Systems',
  description: 'Latest insights on textile quality control, AI manufacturing, traceability, and Industry 4.0 solutions.',
  openGraph: {
    title: 'Blog | Edraak Systems',
    description: 'Latest insights on textile quality control, AI manufacturing, traceability, and Industry 4.0 solutions.',
  },
}

export default async function BlogPage() {
  const posts = await fetchPosts(1, 20)

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
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title.rendered}</h2>
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
        )}
      </section>
    </div>
  )
}
