"use client"

import React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  src?: string
  title?: string
  shadow?: boolean
  poster?: string
  autoplay?: boolean
}

export default function VideoFrame({ src, title = 'Video', shadow = true, poster, autoplay = false }: Props) {
  const isMp4 = !!src && /\.mp4(\?|$)/i.test(src)
  const [broken, setBroken] = React.useState(false)
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  // Lazy-load media when it enters the viewport to avoid large initial downloads
  React.useEffect(() => {
    if (!src) return
    let obs: IntersectionObserver | null = null
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && wrapperRef.current) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // For iframes (e.g., YouTube) and autoplay requested, append autoplay params
              let finalSrc = src
              const isMp4Local = /\.mp4(\?|$)/i.test(src)
              if (!isMp4Local && !!autoplay) {
                const sep = src.includes('?') ? '&' : '?'
                // Ensure mute+playsinline for autoplay to work on most browsers
                const add = 'autoplay=1&mute=1&playsinline=1'
                if (!/autoplay=1/.test(src)) finalSrc = `${src}${sep}${add}`
              }
              setLoadedSrc(finalSrc)
              if (obs) obs.disconnect()
            }
          })
        },
        { rootMargin: '200px' }
      )
      obs.observe(wrapperRef.current)
    } else {
      // Fallback: load immediately
      let finalSrc = src
      const isMp4Local = /\.mp4(\?|$)/i.test(src)
      if (!isMp4Local && !!autoplay) {
        const sep = src.includes('?') ? '&' : '?'
        const add = 'autoplay=1&mute=1&playsinline=1'
        if (!/autoplay=1/.test(src)) finalSrc = `${src}${sep}${add}`
      }
      setLoadedSrc(finalSrc)
    }
    return () => {
      if (obs) obs.disconnect()
    }
  }, [src])

  const posterSrc = poster || '/placeholder.jpg'

  return (
    <div ref={wrapperRef} className={`w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-md ${shadow ? 'shadow-2xl' : ''} overflow-hidden`}>
      <AspectRatio ratio={16 / 9} className="w-full">
        {loadedSrc && !broken ? (
          isMp4 ? (
            <video
              src={loadedSrc}
              title={title}
              preload="metadata"
              poster={posterSrc}
              playsInline
              controls
              autoPlay={!!autoplay}
              muted={!!autoplay}
              controlsList="nodownload"
              disablePictureInPicture
              disableRemotePlayback
              onContextMenu={(e) => e.preventDefault()}
              onError={() => setBroken(true)}
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={loadedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onError={() => setBroken(true) as any}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img src={posterSrc} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
      </AspectRatio>
    </div>
  )
}
