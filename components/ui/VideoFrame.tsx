"use client"

import React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  src?: string
  title?: string
  shadow?: boolean
}

export default function VideoFrame({ src, title = 'Video', shadow = true }: Props) {
  const isMp4 = !!src && /\.mp4(\?|$)/i.test(src)
  const [broken, setBroken] = React.useState(false)

  return (
    <div className={`w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-md ${shadow ? 'shadow-2xl' : ''} overflow-hidden`}>
      <AspectRatio ratio={16 / 9} className="w-full">
        {src && !broken ? (
          isMp4 ? (
            <video
              src={src}
              title={title}
              autoPlay
              loop
              muted
              playsInline
              controls
              controlsList="nodownload"
              disablePictureInPicture
              disableRemotePlayback
              onContextMenu={(e) => e.preventDefault()}
              onError={() => setBroken(true)}
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
              className="w-full h-full"
              onError={() => setBroken(true) as any}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img src="/placeholder.jpg" alt={title} className="w-full h-full object-cover" />
          </div>
        )}
      </AspectRatio>
    </div>
  )
}
