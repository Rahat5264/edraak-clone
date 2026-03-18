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
    <section id="camera-inspection" className="relative top-0 min-h-screen flex items-center bg-white w-full scroll-mt-10 md:scroll-mt-9">
      <div className="w-full px-4 md:px-12 lg:px-24">
        <div className="w-full min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-auto mt-6 sm:mt-0 pb-12 sm:pb-0">
          <div className="lg:col-span-7 px-4 lg:px-8 text-left">
            <p className="text-base md:text-[20px] text-slate-900 mb-2">
              {content.visionSystem.breadcrumbPrefix}
              <span className="font-extrabold">{content.visionSystem.breadcrumbHighlight}</span>
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-tight text-slate-900 mb-4">
              <span className="font-extrabold">{content.visionSystem.titleBold}</span>{' '}
              <span>{content.visionSystem.titleRest}</span>
            </h1>

            <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {Array.isArray(content.visionSystem.description)
                ? content.visionSystem.description.map((p: string, i: number) => (
                    <p key={i} className={i === content.visionSystem.description.length - 1 ? '' : 'mb-4'}>{p}</p>
                  ))
                : <p>{content.visionSystem.description}</p>
              }

              {Array.isArray(content.visionSystem.features) && content.visionSystem.features.length > 0 && (
                <ul className="mt-4 space-y-1 text-slate-900">
                  {content.visionSystem.features.map((feature: string, i: number) => (
                    <li key={i} className="leading-snug">• {feature}</li>
                  ))}
                </ul>
              )}
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
