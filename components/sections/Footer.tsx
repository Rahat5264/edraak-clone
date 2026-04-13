'use client'

import { Linkedin, Twitter, Youtube } from 'lucide-react'
import content from '@/data/content.json'

export default function Footer() {
  const qualityLink = content.footer.company.links.find((link: any) => link.label === 'Quality Policy') || content.footer.legal.find((link: any) => link.label === 'Quality Policy')

  const bottomLinks = [
    content.footer.company.links.find((link: any) => link.label === 'Home'),
    qualityLink,
    content.footer.legal.find((link: any) => link.label === 'Terms & Conditions'),
    content.footer.legal.find((link: any) => link.label === 'Privacy Policy'),
  ].filter(Boolean)

  const columnsClass = content.footer?.showIndustries === false
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5'

  return (
    <footer className="site-header text-white px-4 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr] items-start">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{content.brand.name}</h3>
            <div className="socials-bar mt-6 h-12 max-w-xs bg-white text-[var(--site-header-bg)] flex items-center justify-between px-4 text-sm md:text-base font-medium">
              <span>{content.footer.labels.socials}</span>
              <div className="flex items-center gap-2">
                <a href="https://twitter.com/edraaksystems" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="h-7 w-7 flex items-center justify-center text-[var(--site-header-bg)]">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://twitter.com/edraaksystems" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-7 w-7 flex items-center justify-center text-[var(--site-header-bg)]">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://twitter.com/edraaksystems" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-7 w-7 flex items-center justify-center text-[var(--site-header-bg)]">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

            <div className={`grid ${columnsClass} gap-8 md:-ml-12`}>
            {/* Column 1 - Company */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">{content.footer.labels.company}</h4>
              <ul className="space-y-2 text-sm md:text-base text-white/85">
                {content.footer.company.links.slice(0, 4).map((link: any, idx: number) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Platform (subtabs) */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm md:text-base text-white/85">
                {['Capture', 'Label', 'Train', 'Deploy', 'Action'].map((s: string, idx: number) => (
                  <li key={idx}>
                    <a href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Technologies */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-sm md:text-base text-white/85">
                {(content.technology?.tabLabels || []).map((label: any, idx: number) => (
                  <li key={idx}>
                    <a href={`#technology`} className="hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Industries */}
            {content.footer?.showIndustries !== false && (
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm md:text-base text-white/85">
                {/* Use a small static list for industries (matches site sections) */}
                {['Textile', 'Apparel', 'Pharma', 'FMCG', 'Manufacturing'].map((item, idx) => (
                  <li key={idx}>
                    <a href={`#`} className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            )}

            {/* Column 5 - Case Studies */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-4">Case Studies</h4>
              <ul className="space-y-2 text-sm md:text-base text-white/85">
                {content.caseStudies?.items?.map((cs: any, idx: number) => (
                  <li key={idx}>
                    <a href={cs.image ? '/#industrial-use-cases' : '/#industrial-use-cases'} className="hover:text-white transition-colors">{cs.title}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="border-t border-white/30 mt-10 pt-6 flex items-center justify-between gap-6 whitespace-nowrap overflow-x-auto">
          <p className="text-sm md:text-base text-white/90">© {new Date().getFullYear()} {content.brand.name}. {content.footer.labels.rightsSuffix}</p>
          <div className="flex items-center gap-8 text-sm md:text-base text-white/90 ml-auto">
            {bottomLinks.map((item: any, idx: number) => (
              <a
                key={`${item.label}-${idx}`}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
