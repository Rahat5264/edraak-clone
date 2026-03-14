'use client'

import content from '@/data/content.json'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {content.footer.company.links.map((link: any, idx: number) => (
              <li key={idx}>
                <a href={link.href} className="hover:opacity-100 transition-opacity">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Products</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {content.footer.products.map((product: any, idx: number) => (
              <li key={idx}>
                <a href={product.href} className="hover:opacity-100 transition-opacity">{product.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {content.footer.services.map((service: any, idx: number) => (
              <li key={idx}>
                <a href={service.href} className="hover:opacity-100 transition-opacity">{service.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {content.footer.legal.map((item: any, idx: number) => (
              <li key={idx}>
                <a href={item.href} className="hover:opacity-100 transition-opacity">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
        <p>{content.footer.company.about}</p>
        <p className="mt-4">© 2024 {content.brand.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
