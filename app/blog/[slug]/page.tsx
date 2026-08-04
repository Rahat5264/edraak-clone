import { fetchPost, getSeoTitle, getSeoDescription, getSeoKeywords, getOgImage } from '@/lib/wordpress'
import BlogPostClient from '@/components/blog/BlogPostClient'
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
  return <BlogPostClient slug={slug} />
}
