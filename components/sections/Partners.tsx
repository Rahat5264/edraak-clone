'use client'

import content from '@/data/content.json'

export default function Partners() {
  const partners = content.partners.items as string[]

  return (
    <section className="py-20 md:py-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-center mb-4 text-primary">{content.partners.title}</h2>

        <div className="overflow-hidden">
          <div className="partners-marquee flex gap-8 items-center" aria-hidden="true">
            <div className="flex items-center gap-8">
              {partners.map((partner, idx) => (
                <div key={`a-${idx}`} className="flex-shrink-0 w-28 sm:w-36 md:w-40 h-14 sm:h-16 md:h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(partner)}&background=ffffff&color=333&size=256&rounded=true`}
                    alt={partner}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }}
                  />
                </div>
              ))}
            </div>

            {/* duplicate for seamless loop */}
            <div className="flex items-center gap-8">
              {partners.map((partner, idx) => (
                <div key={`b-${idx}`} className="flex-shrink-0 w-28 sm:w-36 md:w-40 h-14 sm:h-16 md:h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(partner)}&background=ffffff&color=333&size=256&rounded=true`}
                    alt={partner}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .partners-marquee { 
            display: flex; 
            align-items: center; 
            gap: 2rem; 
            animation: partners-scroll 28s linear infinite;
            will-change: transform;
          }

          @keyframes partners-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* hide any scrollbar if present */
          .partners-marquee::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </section>
  )
}
