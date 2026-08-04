'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getFeaturedImageUrl, type WPPost } from '@/lib/wordpress'
import { Skeleton } from '@/components/ui/skeleton'

const API_BASE = (process.env.NEXT_PUBLIC_WORDPRESS_API_BASE || 'https://db.edraaksystems.com/wp-json/wp/v2').replace(/\/+$/, '')

function PostSkeleton() {
  return (
    <article className="min-h-screen bg-white">
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-gray-200 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/20">
          <Skeleton className="h-4 w-32 bg-white/40 mb-6 rounded" />
          <Skeleton className="h-10 md:h-14 w-3/4 max-w-2xl bg-white/40 rounded" />
          <Skeleton className="h-4 w-40 bg-white/40 mt-6 rounded" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <Skeleton className="h-5 w-full mb-6 rounded" />
        <Skeleton className="h-5 w-11/12 mb-6 rounded" />
        <Skeleton className="h-5 w-10/12 mb-6 rounded" />
        <Skeleton className="h-5 w-full mb-6 rounded" />
        <Skeleton className="h-5 w-3/4 mb-6 rounded" />
      </div>
    </article>
  )
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const router = useRouter()
  const [post, setPost] = useState<WPPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(
          `${API_BASE}/posts?slug=${slug}&_embed=wp:featuredmedia`,
          { cache: 'no-store' },
        )
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data: WPPost[] = await res.json()
        if (cancelled) return
        if (data.length === 0) {
          router.replace('/blog')
          return
        }
        setPost(data[0])
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug, router])

  if (loading) return <PostSkeleton />

  if (error || !post) {
    return (
      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-600">
            Couldn&apos;t load this post. Please try again later.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center font-medium mt-6 transition-colors" style={{ color: '#02879F' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to all posts
          </Link>
        </div>
      </article>
    )
  }

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
