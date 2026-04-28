import Contact from '@/components/sections/Contact'
import content from '@/data/content.json'

export const metadata = {
  title: content?.contact?.title || 'Contact',
  description: content?.contact?.description || 'Get in touch with Edraak Systems for product enquiries, demos, and partnerships.',
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
