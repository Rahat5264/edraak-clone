'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import content from '@/data/content.json'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="font-semibold text-lg">
              {content.brand.name}
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium transition-colors" style={{color: 'rgba(255,255,255,0.9)'}}>
                {item.label}
              </a>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 pt-4">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="block text-sm font-medium py-2" style={{color: 'rgba(255,255,255,0.95)'}}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
