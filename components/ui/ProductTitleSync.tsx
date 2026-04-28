"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ProductTitleSync() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || !pathname.startsWith('/products')) return

    const updateTitleFromH1 = () => {
      try {
        const main = document.querySelector('main') || document.body
        const h1 = (main && main.querySelector('h1')) || document.querySelector('h1')
        if (h1 && h1.textContent) {
          const text = h1.textContent.trim()
          const desired = `${text} | Edraak Systems`
          if (document.title !== desired) document.title = desired

          let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
          if (meta) meta.content = ''
          else {
            meta = document.createElement('meta')
            meta.name = 'description'
            meta.content = ''
            document.head.appendChild(meta)
          }
        }
      } catch (e) {
        // ignore
      }
    }

    const updateLayoutFromH1 = () => {
      try {
        // Prefer explicit ID when present
        let left = document.getElementById('product-left-column') as HTMLElement | null

        const main = document.querySelector('main') || document.body
        const h1 = (main && main.querySelector('h1')) || document.querySelector('h1')
        if (!left && h1) {
          // attempt to find the left column (Tailwind lg:col-span-2) by walking up
          let el: HTMLElement | null = h1 as HTMLElement | null
          while (el && el !== document.body) {
            if (el.classList && el.classList.contains('lg:col-span-2')) {
              left = el
              break
            }
            el = el.parentElement
          }
          // fallback: find grid parent and select first column with the lg class
          if (!left) {
            const grid = h1?.closest('.grid') as HTMLElement | null
            if (grid) left = grid.querySelector('[class*="lg:col-span-2"]') as HTMLElement | null || grid.querySelector('div') as HTMLElement | null
          }
        }

        // ensure aside QuickLinks stays visible (sticky)
        const gridParent = (left && left.closest('.grid')) || h1?.closest('.grid')
        const aside = (gridParent && gridParent.querySelector('aside')) || document.querySelector('aside')
        if (aside && aside instanceof HTMLElement) {
          aside.style.position = 'sticky'
          aside.style.top = '6rem'
          aside.style.alignSelf = 'start'
        }

        // If body/html are locked (overflow:hidden), relax them so page can scroll
        try {
          const body = document.body
          const docEl = document.documentElement
          const bodyOverflow = window.getComputedStyle(body).overflowY
          const docOverflow = window.getComputedStyle(docEl).overflowY
          if (bodyOverflow === 'hidden' || docOverflow === 'hidden') {
            body.style.overflowY = 'auto'
            docEl.style.overflowY = 'auto'
          }
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
    }

    updateTitleFromH1()
    updateLayoutFromH1()

    const observer = new MutationObserver(() => {
      updateTitleFromH1()
      updateLayoutFromH1()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
