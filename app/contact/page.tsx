import Contact from '@/components/sections/Contact'
import content from '@/data/content.json'

export const metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <main>
      <section className="relative flex flex-col overflow-hidden px-4 md:px-12 lg:px-24 bg-gradient-to-tr from-[#02879F] to-[#02E3DF] h-[40vh] sm:h-[50vh]">
        <div className="flex-1 flex items-center w-full">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 px-4 lg:px-8 text-left">
              <p className="text-base sm:text-lg md:text-xl text-white/90 tracking-wide">{(content.contact && content.contact.description) || ''}</p>

              <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] lg:text-[44px] leading-tight tracking-tight text-white font-extrabold">{content?.contact?.title || ''}</h1>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 items-center" />
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  )
}
