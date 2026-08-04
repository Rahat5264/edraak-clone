export type WPPost = {
  id: number
  date: string
  date_gmt: string
  guid: { rendered: string }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string; protected: boolean }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: {
    _seopress_titles_title: string
    _seopress_titles_desc: string
    _seopress_social_fb_img: string
    _seopress_social_twitter_img: string
    _seopress_analysis_target_kw: string
    [key: string]: string
  }
  categories: number[]
  tags: number[]
  class_list: string[]
  _links: {
    'wp:featuredmedia'?: [{ href: string }]
    [key: string]: unknown
  }
}

export type WPMedia = {
  id: number
  guid: { rendered: string }
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes?: Record<string, { source_url: string; width: number; height: number }>
  }
}

export type WPCategory = {
  id: number
  name: string
  slug: string
}

const API_BASE = (process.env.WORDPRESS_API_BASE || 'https://db.edraaksystems.com/wp-json/wp/v2').replace(/\/+$/, '')

function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

export async function fetchPosts(page = 1, perPage = 12): Promise<WPPost[]> {
  const res = await fetch(apiUrl(`/posts?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia`), {
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(apiUrl(`/posts?slug=${slug}&_embed=wp:featuredmedia`), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const posts: WPPost[] = await res.json()
  return posts[0] || null
}

export async function fetchMedia(id: number): Promise<WPMedia | null> {
  const res = await fetch(apiUrl(`/media/${id}`), { next: { revalidate: 86400 } })
  if (!res.ok) return null
  return res.json()
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  const sizes = (post as any)._embedded?.['wp:featuredmedia']?.[0] as WPMedia | undefined
  const fallback = sizes?.media_details?.sizes?.full?.source_url
  const medium = sizes?.media_details?.sizes?.medium_large?.source_url
  return medium || fallback || null
}

export function getSeoTitle(post: WPPost): string {
  return post.meta?._seopress_titles_title || post.title.rendered
}

export function getSeoDescription(post: WPPost): string {
  return post.meta?._seopress_titles_desc || stripHtml(post.excerpt.rendered)
}

export function getSeoKeywords(post: WPPost): string {
  return post.meta?._seopress_analysis_target_kw || ''
}

export function getOgImage(post: WPPost): string | null {
  return post.meta?._seopress_social_fb_img || getFeaturedImageUrl(post)
}

export function getTwitterImage(post: WPPost): string | null {
  return post.meta?._seopress_social_twitter_img || getOgImage(post)
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}
