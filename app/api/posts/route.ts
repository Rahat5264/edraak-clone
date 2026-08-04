import { fetchPosts } from '@/lib/wordpress'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || '1')
  const perPage = Number(searchParams.get('per_page') || '12')

  const posts = await fetchPosts(page, perPage)

  return Response.json(posts, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
