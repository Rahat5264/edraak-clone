'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import content from '@/data/content.json'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">
              ES
            </div>
            <span className="hidden sm:inline font-semibold text-lg text-primary">{content.brand.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
            {content.navigation.map((item) => (
              <a key={item.label} href={item.href} className="block text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
