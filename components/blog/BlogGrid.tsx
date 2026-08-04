'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { Skeleton } from '@/components/ui/skeleton'

function BlogCardSkeleton() {
  return (
    <div className="group bg-white border flex flex-col overflow-hidden">
      <Skeleton className="h-56 rounded-none bg-gray-200" />
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ backgroundColor: '#05032A' }}>
        <div>
          <Skeleton className="h-3.5 w-28 bg-gray-700 mb-2 rounded" />
          <Skeleton className="h-6 w-3/4 bg-gray-700 mb-3 rounded" />
          <Skeleton className="h-4 w-full bg-gray-700 mb-2 rounded" />
          <Skeleton className="h-4 w-5/6 bg-gray-700 rounded" />
        </div>
        <Skeleton className="mt-6 h-9 w-24 bg-gray-700 rounded-sm" />
      </div>
    </div>
  )
}

function PostCard({ post }: { post: WPPost }) {
  const imageUrl = (post as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url
    || (post as any)._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url
    || null

  return (
    <Link
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
}

export default function BlogGrid({ perPage = 3 }: { perPage?: number }) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const apiBase = (process.env.NEXT_PUBLIC_WORDPRESS_API_BASE || 'https://db.edraaksystems.com/wp-json/wp/v2').replace(/\/+$/, '')

    async function load() {
      try {
        const res = await fetch(
          `${apiBase}/posts?page=1&per_page=${perPage}&_embed=wp:featuredmedia`,
          { cache: 'no-store' },
        )
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!cancelled) setPosts(data)
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
  }, [perPage])

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: Math.min(perPage, 3) }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-gray-500">Couldn&apos;t load the latest posts. Please try again later.</p>
  }

  if (posts.length === 0) return null

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
