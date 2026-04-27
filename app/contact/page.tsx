import Contact from '@/components/sections/Contact'
import content from '@/data/content.json'

const SITE_URL = 'https://www.edraaksystems.com'

export const metadata = {
  title: `Contact | ${content?.brand?.name || 'Edraak Systems'}`,
  description: content?.brand?.tagline || 'Contact Edraak Systems for traceability and quality solutions.',
  openGraph: { title: `Contact | ${content?.brand?.name || 'Edraak Systems'}`, description: content?.brand?.tagline || '' },
  alternates: { canonical: `${SITE_URL}/contact` }
}

export default function ContactPage() {
  return (
    <main>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black">{content?.contact?.title || 'Contact'}</h1>
        </div>
      </section>

      <Contact />
    </main>
  )
}
