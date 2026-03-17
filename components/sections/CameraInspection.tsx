"use client"

import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import VideoFrame from '@/components/ui/VideoFrame'
import content from '@/data/content.json'

export default function CameraInspection() {
  const raw = content.visionSystem?.videoUrl || ''
  const isMp4 = /\.mp4(\?|$)/i.test(raw)
  const sep = raw.includes('?') ? '&' : '?'
  const src = raw ? (isMp4 ? raw : `${raw}${sep}autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`) : ''

  return (
    <section id="camera-inspection" className="relative top-10 md:top-0 min-h-screen flex items-center bg-white w-full">
      <div className="w-full px-4 md:px-12 lg:px-24">
        <div className="w-full min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-auto mt-6 sm:mt-0 pb-12 sm:pb-0">
          <div className="lg:col-span-7 px-4 lg:px-8 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 mb-6">
              {content.visionSystem.title}
            </h1>

            <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {Array.isArray(content.visionSystem.description)
                ? content.visionSystem.description.map((p: string, i: number) => (
                    <p key={i} className={i === content.visionSystem.description.length - 1 ? '' : 'mb-4'}>{p}</p>
                  ))
                : <p>{content.visionSystem.description}</p>
              }
            </div>

            <div>
                <Button asChild size="lg" className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white">
                  <a href="#contact">{content.visionSystem.cta}</a>
                </Button>
            </div>
          </div>

          <div className="lg:col-span-5 px-4 lg:px-8 flex justify-center lg:justify-end">
            <VideoFrame src={src} title="Camera Inspection Video" shadow={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
