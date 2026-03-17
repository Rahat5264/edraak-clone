"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  src?: string
  title?: string
  shadow?: boolean
}

export default function VideoFrame({ src, title = 'Video', shadow = true }: Props) {
  const isMp4 = !!src && /\.mp4(\?|$)/i.test(src)

  return (
    <div className={`w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-md ${shadow ? 'shadow-2xl' : ''} overflow-hidden`}>
      <AspectRatio ratio={16 / 9} className="w-full">
        {src ? (
          isMp4 ? (
            <video
              src={src}
              title={title}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </AspectRatio>
    </div>
  )
}
