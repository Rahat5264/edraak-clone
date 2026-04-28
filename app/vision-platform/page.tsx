import React from 'react'
import content from '@/data/vision-platform.json'
import { Button } from '@/components/ui/button'

const visionContent: any = content

export const metadata = {
  title: 'Vision Platform',
  description: (visionContent?.visionSystem?.description && Array.isArray(visionContent.visionSystem.description)) ? visionContent.visionSystem.description.join(' ') : (visionContent?.hero?.description || 'AI-powered vision platform for high-speed fabric inspection and traceability.'),
}

export default function VisionPlatformPage() {
  const vision = visionContent?.visionSystem || {}
  const cam = visionContent?.cameraIndustries || {}
  const sectors = visionContent?.sectors || { items: [] }

  const fabricTypes = [
    {
      name: 'Greige Fabric',
      content:
        'Inspect raw fabric straight from the loom, detecting knots, slubs, holes, and uneven weave.',
    },
    {
      name: 'Dyed Fabric',
      content: 'Check for uneven dyeing, stains, dye marks, and streaks visible post-dyeing.',
    },
    {
      name: 'Denim',
      content: 'Specialized detection for streaks, neps, barre marks, and finishing defects.',
    },
    {
      name: 'On-Loom',
      content: 'Real-time monitoring during weaving with instant operator alerts.',
    },
  ]

  return (
    <main className="bg-[var(--bg,white)]">
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-[#050a10] via-[#0a1628] to-[#0d1f35]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#02879F]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#02E3DF]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-36 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-heading text-sm text-[#02E3DF] font-semibold uppercase tracking-wide mb-4">Edraak Vision System</p>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                AI Powered
                <br />
                <span className="text-[#02E3DF]">Vision System</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
Detect fabric defects instantly with high precision and unmatched speed, faster and more accurate than manual inspection.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="font-heading inline-flex items-center gap-2 bg-[#02E3DF] text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-[#02E3DF]/90 transition-all hover:scale-105">
                  <a href="/products">
                    Explore Products
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </Button>

                <Button asChild className="font-heading inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
                  <a href="/contact">Contact Sales</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="https://db.edraaksystems.com/wp-content/uploads/2026/03/fabric-inspection-rotated.jpg" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#02879F]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera w-5 h-5 text-[#02879F]" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg>
                  </div>

                  <div>
                    <p className="font-heading text-2xl font-bold text-gray-900">99.7%</p>
                    <p className="font-body text-xs text-gray-500">Detection Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section className="bg-[#0d1f35] pt-4 pb-16 md:pb-20">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-[#02E3DF]">99.7%</div>
                <div className="font-heading text-sm text-white font-semibold mt-1">Accuracy</div>
                <div className="font-body text-xs text-white/60">Defect detection</div>
              </div>

              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-[#02E3DF]">50+</div>
                <div className="font-heading text-sm text-white font-semibold mt-1">Defect Types</div>
                <div className="font-body text-xs text-white/60">Automatically identified</div>
              </div>

              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-[#02E3DF]">24/7</div>
                <div className="font-heading text-sm text-white font-semibold mt-1">Operation</div>
                <div className="font-body text-xs text-white/60">Non-stop monitoring</div>
              </div>

              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-[#02E3DF]">4K</div>
                <div className="font-heading text-sm text-white font-semibold mt-1">Resolution</div>
                <div className="font-body text-xs text-white/60">Ultra HD cameras</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 bg-gray-50">
        <div className="max-w-[980px] mx-auto">
          <div className="max-w-[600px] mb-16 md:mb-20">
            <p className="font-heading text-sm text-gray-500 font-semibold mb-3">Capabilities</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight">Edraak Vision<br /><span className="text-gray-400">System.</span></h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#02879F]/10 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye w-6 h-6 text-[#02879F]" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Advanced Vision Intelligence</h3>
              <p className="font-body text-gray-500">Ultra-precise AI analysis with high-resolution fabric scanning</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#02879F]/10 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-6 h-6 text-[#02879F]" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Dynamic Real-Time Detection</h3>
              <p className="font-body text-gray-500">Continuous AI monitoring and instant defect flagging during production</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#02879F]/10 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column w-6 h-6 text-[#02879F]" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Automated Cutting Optimization</h3>
              <p className="font-body text-gray-500">AI-powered planning system that maximizes fabric utilization and grade-A output</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#02879F]/10 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan w-6 h-6 text-[#02879F]" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Digital Fabric Lifecycle Tracking</h3>
              <p className="font-body text-gray-500">End-to-end traceability and complete history of every roll</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 bg-gray-100">
        <div className="max-w-[980px] mx-auto">
          <div className="max-w-[600px] mb-16 md:mb-20">
            <p className="font-heading text-sm text-gray-500 font-semibold mb-3">Applications</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight">Fabric<br /><span className="text-gray-400">Types.</span></h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {fabricTypes.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 text-[#02879F] mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                  <h3 className="font-heading text-lg font-semibold text-gray-900">{t.name}</h3>
                </div>
                <p className="font-body text-gray-500 text-sm leading-relaxed ml-8">{t.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 bg-gray-50">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-gray-500 font-semibold mb-3">Why Choose EVS</p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight">Next-Gen<br /><span className="text-gray-400">Fabric Inspection.</span></h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Blazing-fast inspection with microscopic accuracy</p>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Advanced high-resolution imaging for reliable defect identification</p>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Smart optimization engine that maximizes A-grade output</p>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Fully automated fault labeling and sticker application</p>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Direct integration with cutting machines for optimized roll cutting</p>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full bg-[#02879F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-[#02879F]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <p className="font-body text-gray-700">Complete digital traceability reducing manual work and human error</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 bg-gray-50">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-heading text-sm text-gray-500 font-semibold mb-3">Beyond Textiles</p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">Other<br /><span className="text-gray-400">Industries.</span></h2>
              <p className="font-body text-lg text-gray-500 leading-relaxed mb-6">EVS provides reliable camera-based inspection for pharma, food, electronics, and automotive industries.</p>
              <a href="/contact" className="font-heading inline-flex items-center gap-2 text-[#02879F] font-semibold hover:underline">Learn More<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <img src="https://db.edraaksystems.com/wp-content/uploads/2026/03/QmOZF.jpg" alt="Camera inspection in other industries" className="w-full h-[300px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 bg-[#050a10] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,135,159,0.15)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-[980px] mx-auto text-center">
          <p className="font-heading text-sm text-[#02E3DF] font-semibold mb-4">Get Started</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">Ready to Upgrade<br />Your Quality Control?</h2>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-[600px] mx-auto mb-10">Join leading textile manufacturers who trust EVS for fabric inspection.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="font-heading inline-flex items-center gap-2 bg-[#02E3DF] text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-[#02E3DF]/90 transition-all hover:scale-105">
              <a href="/contact">Contact Sales<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </Button>

            <Button asChild className="font-heading inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              <a href="/products">View Products<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </Button>
          </div>
        </div>
      </section>

      
    </main>
  )
}
