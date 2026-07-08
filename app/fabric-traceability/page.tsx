import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

const SITE_URL = 'https://www.edraaksystems.com'

const prod: any = {
  title: 'Fabric Traceability',
  subtitle: 'AI & IoT-Based Fabric Traceability System',
  summary: `**
## AI & IoT-Based Fabric Traceability System
Edraak Systems provides an AI and IoT-based Fabric Traceability System for high-speed, paperless, and real-time traceable production. The system covers the complete manufacturing process through digitalization solutions, allowing textile manufacturers to track production, verify machine parameters, collect real-time data, and maintain complete fabric traceability.

Our textile traceability system improves production visibility, reduces paperwork, minimizes human error, and provides real-time production tracking from planning to fabric cutting.

## Complete Production Flow
The Fabric Traceability System connects every production process through intelligent modules.

- Production Planning
- Greige Inspection
- Batch Making
- Processing & Dyeing
- Fabric Inspection
- Cutting Plan Generation
- Fabric Cutting & Labelling
Every process is digitally connected, ensuring real-time production tracking and complete fabric traceability throughout production.

## Production Planning
The [production machine flow](https://www.edraaksystems.com/products/planning-software), recipe, and machine parameters are prepared in the software. Users can use article recipes directly from the database, visualize machine load in real time, and create custom templates.

Benefits

- Reduced production planning time
- Balanced production flow
- Real-time machine monitoring

## Greige Inspection
Custom keyboards and digital sensors identify faults and measure fabric. Fault location and measurement data are updated in the database in real time.

Benefits

- Intelligent fault mapping
- Accurate fabric measurement
- Reduced fault logging time
- Real-time production data

## Batch Making
[Batch Making](https://www.edraaksystems.com/products/fabric-batch-making) module collects roll quantity and length while QR Code Stickers are attached to every seam for complete fabric traceability during processing.

Benefits

- Roll identification
- Automatic measurement
- Real-time roll records
- QR code traceability

## Processing & Dyeing
The system provides complete production flow tracking, recipe verification, machine parameter verification, and real-time process updates through QR code scanning and encoder data.

Operators can verify previous and next operations, update recipe changes, and analyze fabric shade variation during production.

Benefits

- Reduced human error
- Smooth production flow
- Real-time production tracking
- Complete process traceability

## Production Tracking
[Production Tracking](https://www.edraaksystems.com/products/fabric-production-processing) is  a Real-time dashboards that allow operators to supervise the complete production process from a single screen. Production load, machine status, and running data help improve efficiency and reduce downtime.

## Fabric Inspection
High-frequency cameras with [AI-powered inspection](https://www.edraaksystems.com/products/camera-inspection-system) perform high-speed fabric inspection. Intelligent fault mapping, automatic fault labeling, width measurement, and digital meter measurement improve inspection accuracy.

Benefits

- AI-powered defect detection
- Smart fault mapping
- Width monitoring
- Accurate quality inspection

## Cutting Optimization & Roll Making
The Optimization System generates cutting plans according to fault mapping and roll length. The cutting machine automatically follows the optimized mapping for roll cutting, selvage marking, and roll labelling, helping produce maximum A-grade rolls.

# Precision Fabric Metering & Seam Detection

### Summary
Linked with digital encoders, ultra-high-speed optical seam scanners detect seams and scan barcodes in real time, providing the most accurate fabric meter measurement and complete roll-level traceability.

### Need

- Digital encoders for precise length measurement
- Ultra high-speed optical seam scanners
- Real-time Barcode / RFID scanning
- Integration with MES and traceability database

### Existing Process
Manual measurements and batch-level estimations create inaccuracies and gaps in fabric traceability.

### Proposed Process
Automated seam detection with encoder and barcode scanning provides roll-level and piece-level traceability, precise fabric metering, and real-time production data.

## Key Features

- AI & IoT-based production planning
- Real-time production tracking
- Intelligent fault mapping
- QR code roll identification
- Recipe & machine parameter verification
- AI-powered fabric inspection
- Cutting optimization
- Roll-level and piece-level traceability

## Why Choose Edraak Fabric Traceability System?
[Edraak Systems](https://www.edraaksystems.com/) combines AI, IoT, real-time production tracking, intelligent fault mapping, QR code identification, and production planning into one integrated textile traceability system. From production planning to fabric cutting, every process is digitally connected, providing manufacturers with complete fabric traceability, improved production efficiency, reduced human error, and real-time visibility across the entire textile manufacturing process.

Get complete Fabric Traceability, real-time production tracking, and intelligent process control with Edraak Systems. [Contact us today](https://www.edraaksystems.com/contact). 

**`,
  pageContent: [
    { type: 'heading', text: 'AI & IoT-Based Fabric Traceability System' },
    { type: 'text', text: 'Edraak Systems provides an AI and IoT-based Fabric Traceability System for high-speed, paperless, and real-time traceable production. The system covers the complete manufacturing process through digitalization solutions, allowing textile manufacturers to track production, verify machine parameters, collect real-time data, and maintain complete fabric traceability.' },
    { type: 'text', text: 'Our textile traceability system improves production visibility, reduces paperwork, minimizes human error, and provides real-time production tracking from planning to fabric cutting.' },
    { type: 'heading', text: 'Complete Production Flow' },
    { type: 'list', items: ['Production Planning', 'Greige Inspection', 'Batch Making', 'Processing & Dyeing', 'Fabric Inspection', 'Cutting Plan Generation', 'Fabric Cutting & Labelling'] },
    { type: 'text', text: 'Every process is digitally connected, ensuring real-time production tracking and complete fabric traceability throughout production.' },
    { type: 'heading', text: 'Production Planning' },
    { type: 'text', text: [ { type: 'link', label: 'production machine flow', href: 'https://www.edraaksystems.com/products/planning-software', color: '#020026', bold: true, underline: true }, { type: 'text', text: ', recipe, and machine parameters are prepared in the software. Users can use article recipes directly from the database, visualize machine load in real time, and create custom templates.' } ] },
    { type: 'heading', text: 'Benefits' },
    { type: 'list', items: ['Reduced production planning time', 'Balanced production flow', 'Real-time machine monitoring'] },
    { type: 'heading', text: 'Greige Inspection' },
    { type: 'text', text: 'Custom keyboards and digital sensors identify faults and measure fabric. Fault location and measurement data are updated in the database in real time.' },
    { type: 'heading', text: 'Benefits' },
    { type: 'list', items: ['Intelligent fault mapping', 'Accurate fabric measurement', 'Reduced fault logging time', 'Real-time production data'] },
    { type: 'heading', text: 'Batch Making' },
    { type: 'text', text: [ { type: 'link', label: 'Batch Making', href: 'https://www.edraaksystems.com/products/fabric-batch-making', color: '#020026', bold: true, underline: true }, { type: 'text', text: ' module collects roll quantity and length while QR Code Stickers are attached to every seam for complete fabric traceability during processing.' } ] },
    { type: 'heading', text: 'Benefits' },
    { type: 'list', items: ['Roll identification', 'Automatic measurement', 'Real-time roll records', 'QR code traceability'] },
    { type: 'heading', text: 'Processing & Dyeing' },
    { type: 'text', text: 'The system provides complete production flow tracking, recipe verification, machine parameter verification, and real-time process updates through QR code scanning and encoder data.' },
    { type: 'text', text: 'Operators can verify previous and next operations, update recipe changes, and analyze fabric shade variation during production.' },
    { type: 'heading', text: 'Benefits' },
    { type: 'list', items: ['Reduced human error', 'Smooth production flow', 'Real-time production tracking', 'Complete process traceability'] },
    { type: 'heading', text: 'Production Tracking' },
    { type: 'text', text: [ { type: 'link', label: 'Production Tracking', href: 'https://www.edraaksystems.com/products/fabric-production-processing', color: '#020026', bold: true, underline: true }, { type: 'text', text: ' is a real-time dashboard that allows operators to supervise the complete production process from a single screen. Production load, machine status, and running data help improve efficiency and reduce downtime.' } ] },
    { type: 'heading', text: 'Fabric Inspection' },
    { type: 'text', text: [ { type: 'link', label: 'AI-powered inspection', href: 'https://www.edraaksystems.com/products/camera-inspection-system', color: '#020026', bold: true, underline: true }, { type: 'text', text: ' with high-frequency cameras perform high-speed fabric inspection. Intelligent fault mapping, automatic fault labeling, width measurement, and digital meter measurement improve inspection accuracy.' } ] },
    { type: 'heading', text: 'Benefits' },
    { type: 'list', items: ['AI-powered defect detection', 'Smart fault mapping', 'Width monitoring', 'Accurate quality inspection'] },
    { type: 'heading', text: 'Cutting Optimization & Roll Making' },
    { type: 'text', text: 'The Optimization System generates cutting plans according to fault mapping and roll length. The cutting machine automatically follows the optimized mapping for roll cutting, selvage marking, and roll labelling, helping produce maximum A-grade rolls.' },
    { type: 'heading', text: 'Precision Fabric Metering & Seam Detection' },
    { type: 'heading', text: 'Summary' },
    { type: 'text', text: 'Linked with digital encoders, ultra-high-speed optical seam scanners detect seams and scan barcodes in real time, providing the most accurate fabric meter measurement and complete roll-level traceability.' },
    { type: 'heading', text: 'Need' },
    { type: 'list', items: ['Digital encoders for precise length measurement', 'Ultra high-speed optical seam scanners', 'Real-time Barcode / RFID scanning', 'Integration with MES and traceability database'] },
    { type: 'heading', text: 'Existing Process' },
    { type: 'text', text: 'Manual measurements and batch-level estimations create inaccuracies and gaps in fabric traceability.' },
    { type: 'heading', text: 'Proposed Process' },
    { type: 'text', text: 'Automated seam detection with encoder and barcode scanning provides roll-level and piece-level traceability, precise fabric metering, and real-time production data.' },
    { type: 'heading', text: 'Key Features' },
    { type: 'list', items: ['AI & IoT-based production planning', 'Real-time production tracking', 'Intelligent fault mapping', 'QR code roll identification', 'Recipe & machine parameter verification', 'AI-powered fabric inspection', 'Cutting optimization', 'Roll-level and piece-level traceability'] },
    { type: 'heading', text: 'Why Choose Edraak Fabric Traceability System?' },
    { type: 'text', text: [ { type: 'link', label: 'Edraak Systems', href: 'https://www.edraaksystems.com/', color: '#020026', bold: true, underline: true }, { type: 'text', text: ' combines AI, IoT, real-time production tracking, intelligent fault mapping, QR code identification, and production planning into one integrated textile traceability system. From production planning to fabric cutting, every process is digitally connected, providing manufacturers with complete fabric traceability, improved production efficiency, reduced human error, and real-time visibility across the entire textile manufacturing process.' } ] },
    { type: 'text', text: [ { type: 'text', text: 'Get complete Fabric Traceability, real-time production tracking, and intelligent process control with Edraak Systems. ' }, { type: 'link', label: 'Get in touch', href: 'https://www.edraaksystems.com/contact', color: '#020026', bold: true, underline: true }, { type: 'text', text: ' with our experts.' } ] }
  ],
  need: [
    'Digital encoders for precise length measurement',
    'Ultra high-speed optical seam scanners',
    'Real-time Barcode / RFID scanning',
    'Integration with MES and traceability database'
  ],
  existingProcess: `Manual measurements and batch-level estimations create inaccuracies and gaps in fabric traceability.`,
  proposedProcess: `Automated seam detection with encoder and barcode scanning provides roll-level and piece-level traceability, precise fabric metering, and real-time production data.`,
  img: 'https://db.edraaksystems.com/wp-content/uploads/2026/03/Good-Morning-Facebook-Post.png',
  images: [
    'https://db.edraaksystems.com/wp-content/uploads/2026/03/Good-Morning-Facebook-Post.png'
  ]
}

export async function generateMetadata() {
  const title = `${prod.title} | Edraak Systems`
  const description = 'Fabric Traceability System with AI-powered production tracking, QR code traceability, digital encoders, and intelligent fault mapping for textile manufacturing.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/fabric-traceability`,
      type: 'website',
      images: prod.img ? [{ url: prod.img }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: prod.img ? [prod.img] : undefined,
    },
    alternates: { canonical: `${SITE_URL}/fabric-traceability` },
  }
}

export default function FabricTraceabilityPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              {prod.comingSoon ? (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-500">{prod.comingSoonText || 'Coming soon'}</div>
              ) : (
                <img src={(prod.img || (prod.images && prod.images[0]) || '')} alt={prod.title} className="w-full h-80 object-cover" />
              )}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl leading-tight font-semibold text-slate-900">{prod.title}</h1>
            {prod.subtitle && <p className="text-sm font-medium mt-2" style={{ color: 'rgb(5,3,42)' }}>{prod.subtitle}</p>}

            {prod.pageContent && Array.isArray(prod.pageContent) ? (
              <div className="mt-4 text-lg text-slate-700 space-y-6">
                {prod.pageContent.map((item: any, i: number) => {
                  if (!item) return null
                  if (item.type === 'heading') return <h2 key={i} className="text-2xl font-semibold">{item.text}</h2>
                  if (item.type === 'text') {
                    if (typeof item.text === 'string') return <p key={i}>{item.text}</p>
                    if (Array.isArray(item.text)) {
                      return (
                        <p key={i}>
                          {item.text.map((seg: any, si: number) => {
                            if (!seg) return null
                            if (seg.type === 'link') {
                              const styleObj: any = {}
                              if (seg.color) styleObj.color = seg.color
                              if (seg.bold) styleObj.fontWeight = typeof seg.bold === 'number' ? seg.bold : 600
                              if (seg.underline) styleObj.textDecoration = 'underline'
                              const style = Object.keys(styleObj).length ? styleObj : undefined
                              return (
                                <a key={si} href={seg.href} style={style} target={seg.target || undefined} rel={seg.rel || undefined}>
                                  {seg.label}
                                </a>
                              )
                            }
                            return <span key={si}>{seg.text}</span>
                          })}
                        </p>
                      )
                    }
                    return null
                  }
                  if (item.type === 'image') return (
                    item.src ? (
                      <div key={i} className="w-full">
                        <img src={item.src} alt={item.alt || ''} className="w-full object-cover" />
                      </div>
                    ) : (
                      <div key={i} className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">Image placeholder</div>
                    )
                  )
                  if (item.type === 'list') return (
                    <ul key={i} className="list-disc pl-6 text-slate-700">
                      {Array.isArray(item.items) && item.items.map((li: string, lii: number) => <li key={lii}>{li}</li>)}
                    </ul>
                  )
                  return null
                })}
              </div>
            ) : (prod.summary && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Summary</h4>
                <p className="text-slate-700">{prod.summary}</p>
              </div>
            ))}

            <div className="mt-8 flex gap-3">
              <Link href="/products" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
              <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Category</p>
                <p className="text-sm" style={{ color: 'rgb(5,3,42)' }}>{prod.category || prod.subtitle || '—'}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700">Gallery</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {prod.comingSoon ? (
                    <div className="h-20 w-full overflow-hidden rounded-md bg-gray-100 col-span-3 flex items-center justify-center text-sm font-medium text-gray-500">{prod.comingSoonText || 'Coming soon'}</div>
                  ) : (((prod.images && Array.isArray(prod.images) && prod.images) || []).length > 0 ? (
                    prod.images.map((u: string, i: number) => (
                      <div key={i} className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                        <img src={u} alt={`${prod.title}-${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <div className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sticky top-24"><QuickLinks /></div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
