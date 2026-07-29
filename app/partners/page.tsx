import type { Metadata } from 'next'
import PartnersClient from './PartnersClient'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Partners | Edraak Systems'
  const description = 'Become an integration partner with Edraak Systems and connect your solutions to industrial vision workflows.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/partners`,
      siteName: 'Edraak Systems',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/partners`,
    },
  }
}

export default function PartnersPage() {
  return <PartnersClient />
}