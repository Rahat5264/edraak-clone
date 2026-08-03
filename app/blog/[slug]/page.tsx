import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchPost, getSeoTitle, getSeoDescription, getSeoKeywords, getOgImage, getFeaturedImageUrl } from '@/lib/wordpress'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { Metadata } from 'next'

const SITE_URL = 'https://www.edraaksystems.com'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) return {}

  const title = getSeoTitle(post)
  const description = getSeoDescription(post)
  const ogImage = getOgImage(post)

  return {
    title,
    description,
    keywords: getSeoKeywords(post),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date_gmt,
      modifiedTime: post.modified_gmt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const imageUrl = getFeaturedImageUrl(post)
  const published = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <article className="min-h-screen bg-white">
      {/* Featured image as full-width header with overlay title */}
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-gray-900">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title.rendered}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <Link href="/blog" className="text-white/70 hover:text-white text-sm mb-4 transition-colors">
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
            {post.title.rendered}
          </h1>
          <p className="text-white/80 mt-4 text-sm">{published}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center font-medium transition-colors" style={{ color: '#02879F' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}
