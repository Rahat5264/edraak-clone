"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  src?: string
  title?: string
}

export default function VideoFrame({ src, title = 'Video' }: Props) {
  return (
    <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden">
      <AspectRatio ratio={16 / 9} className="w-full">
        {src ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </AspectRatio>
    </div>
  )
}
