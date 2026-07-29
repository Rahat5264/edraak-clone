import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const SITE_URL = 'https://www.edraaksystems.com'

interface Industry {
  name: string
  image: string
  intro: string
  outcome: string
  details: string
  subtitle: string
  pageContent: { type: string; text?: string; items?: string[]; src?: string; alt?: string }[]
}

const industries: Industry[] = [
  {
    name: 'Automobile',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/automibile-1.jpg',
    intro: 'Quality control in the automobile industry at the final stages.',
    outcome: 'Outcome is reporting, tagging of defects, and better planning for the next process.',
    details:
      'EVS can be deployed at end-of-line inspection points, helping teams flag defects early, reduce manual review, and keep production moving with clearer machine data.',
    subtitle: 'AI-Powered Visual Inspection for Automotive Manufacturing',
    pageContent: [
      { type: 'heading', text: 'End-of-Line Quality Control' },
      { type: 'text', text: 'EVS brings computer vision to automobile production lines, deployed at final inspection points to detect surface defects, verify assembly completeness, and flag anomalies before vehicles leave the line. Teams can reduce manual review while maintaining high quality standards.' },
      { type: 'text', text: 'The system captures detailed defect data — location, type, severity — and makes it available in real-time dashboards for production supervisors.' },
      { type: 'heading', text: 'Defect Tagging & Reporting' },
      { type: 'text', text: 'Every detected defect is automatically tagged with its position and category. This enables teams to spot recurring issues, trace root causes, and adjust upstream processes. Reports are generated on demand with no manual data entry.' },
      { type: 'heading', text: 'Production Planning' },
      { type: 'text', text: 'With clearer machine data from visual inspection, production planners can identify bottleneck stations, measure defect trends over time, and plan corrective actions with confidence. The result is better planning for every downstream process step.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['Real-time defect detection at end-of-line stations', 'Automated defect tagging with location and severity data', 'Reduced manual quality checks', 'Data-driven production planning', 'Actionable reporting for process improvement'] },
    ],
  },
  {
    name: 'Minerals',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/pexels-mart-production-8471928-scaled.webp',
    intro: 'Sorting and evaluation of minerals at the input stage.',
    outcome: 'Outcome is reporting and removal of defective parts.',
    details:
      'For mineral workflows, EVS can support sorting, grading, and visual verification so operators can spot inconsistencies before they move downstream.',
    subtitle: 'Visual Sorting & Grading for Mineral Processing',
    pageContent: [
      { type: 'heading', text: 'Input Stage Sorting & Evaluation' },
      { type: 'text', text: 'EVS is deployed at the input stage of mineral processing to sort materials, evaluate quality, and identify inconsistencies before they enter the production flow. Cameras capture high-resolution images of incoming material for real-time analysis.' },
      { type: 'text', text: 'Operators receive instant feedback on material quality, enabling faster decisions about acceptance, rejection, or re-routing.' },
      { type: 'heading', text: 'Defect Detection & Removal' },
      { type: 'text', text: 'The system identifies defective or substandard mineral content using visual criteria. Detected defects are flagged automatically, and the system can trigger removal mechanisms to separate substandard material from the production line.' },
      { type: 'heading', text: 'Reporting & Traceability' },
      { type: 'text', text: 'Comprehensive reports are generated for every batch, documenting quality metrics, defect rates, and sorting outcomes. This creates a traceable record that supports compliance and process optimization.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['Real-time mineral sorting and grading', 'Automatic defect detection and removal', 'Batch-level quality reporting', 'Reduced manual inspection effort', 'Traceable quality records'] },
    ],
  },
  {
    name: 'Paper',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/paper-roll.jpg',
    intro: 'Detecting anomalies in printing, de-coloration, and/or stains.',
    outcome: 'Outcome is reporting, removal of defective parts, and calculation of machine efficiency.',
    details:
      'Paper lines benefit from real-time anomaly detection, allowing manufacturers to identify print issues, surface marks, and efficiency losses without slowing the line.',
    subtitle: 'Real-Time Anomaly Detection for Paper Production',
    pageContent: [
      { type: 'heading', text: 'Print & Surface Anomaly Detection' },
      { type: 'text', text: 'EVS monitors paper production lines in real time, detecting printing defects, de-coloration, stains, and surface irregularities as they occur. High-speed cameras scan the full web width without slowing production.' },
      { type: 'text', text: 'Operators are alerted instantly when anomalies are detected, allowing immediate corrective action before large quantities of defective material are produced.' },
      { type: 'heading', text: 'Machine Efficiency Calculation' },
      { type: 'text', text: 'Beyond defect detection, EVS tracks production metrics that feed into machine efficiency calculations. Downtime events, defect rates, and production speed are logged automatically for performance analysis.' },
      { type: 'heading', text: 'Defective Part Removal' },
      { type: 'text', text: 'When defects are detected, the system can trigger removal mechanisms to isolate affected sections. This prevents defective material from reaching downstream processes or customers.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['Real-time print and surface anomaly detection', 'Automatic machine efficiency tracking', 'Defective section isolation and removal', 'Reduced waste and rework', 'Comprehensive production reporting'] },
    ],
  },
  {
    name: 'Food & Beverages',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_17_48-AM.jpg',
    intro: 'Detecting packaging issues, baking issues in biscuits, broken items, color-based issues, incorrect packaging, etc.',
    outcome: 'Outcome is better quality control, reporting, and removal of defective parts. Calculation of machine efficiency.',
    details:
      'Food and beverage production can use EVS to check packaging integrity, product consistency, and line quality while also supporting traceable reporting.',
    subtitle: 'Visual Quality Control for Food & Beverage Lines',
    pageContent: [
      { type: 'heading', text: 'Packaging Integrity Inspection' },
      { type: 'text', text: 'EVS inspects packaged food and beverage products for seal integrity, label placement, fill levels, and packaging damage. Cameras capture every unit at line speed, flagging defects in real time.' },
      { type: 'text', text: 'This reduces the risk of compromised products reaching consumers and supports compliance with food safety standards.' },
      { type: 'heading', text: 'Product Consistency Checks' },
      { type: 'text', text: 'The system checks for baking issues in biscuits, broken items, color-based defects, and incorrect packaging. Visual consistency is measured against defined quality thresholds, and non-conforming items are automatically flagged.' },
      { type: 'heading', text: 'Traceable Quality Reporting' },
      { type: 'text', text: 'Every inspection result is logged with timestamps and batch information, creating a complete quality record. Reports support traceability audits and help identify recurring issues for process improvement.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['High-speed packaging integrity inspection', 'Product consistency and color verification', 'Automatic defect flagging and removal', 'Batch-level traceable quality records', 'Reduced manual quality checks'] },
    ],
  },
  {
    name: 'Textiles',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_26_11-AM.webp',
    intro: 'Fabric inspection, defect detection, and inline quality monitoring.',
    outcome: 'Outcome is improved fabric quality, automated reporting, and fewer manual checks.',
    details:
      'Textile teams can use EVS to inspect fabric continuously, reduce rework, and build a more reliable quality-control workflow across production.',
    subtitle: 'Inline Fabric Inspection & Quality Monitoring',
    pageContent: [
      { type: 'heading', text: 'Continuous Fabric Inspection' },
      { type: 'text', text: 'EVS performs high-speed continuous inspection of fabric surfaces, detecting defects such as holes, stains, weaving errors, and color variations. The system scans the full fabric width at production speed without interrupting the line.' },
      { type: 'text', text: 'Defects are mapped to their exact location on the fabric, enabling precise marking and downstream removal.' },
      { type: 'heading', text: 'Automated Quality Reporting' },
      { type: 'text', text: 'Inspection results are compiled into automated quality reports that document defect types, locations, frequencies, and trends. This data helps production teams identify quality patterns and make informed process adjustments.' },
      { type: 'heading', text: 'Reduced Manual Inspection' },
      { type: 'text', text: 'By automating visual inspection, EVS reduces the need for manual fabric checking. Operators can focus on exceptions rather than routine inspection, improving both efficiency and inspection consistency.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['Real-time continuous fabric inspection', 'Precise defect mapping and marking', 'Automated quality reporting', 'Reduced manual inspection workload', 'Consistent, repeatable quality control'] },
    ],
  },
  {
    name: 'Robotics',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/robotics.jpg',
    intro: 'Vision checks for robotic cells and automated production lines.',
    outcome: 'Outcome is faster feedback, better process control, and reduced downtime.',
    details:
      'Robotic systems can use EVS as a visual feedback layer, helping teams monitor alignment, detect anomalies, and keep automated processes stable.',
    subtitle: 'Vision Feedback for Robotic Automation',
    pageContent: [
      { type: 'heading', text: 'Visual Checks for Robotic Cells' },
      { type: 'text', text: 'EVS provides a visual feedback layer for robotic cells and automated production lines. Cameras monitor robotic operations in real time, checking alignment, positioning, and output quality.' },
      { type: 'text', text: 'When anomalies are detected — such as misalignment, missing components, or incorrect assembly — the system alerts operators or triggers corrective actions.' },
      { type: 'heading', text: 'Process Control & Stability' },
      { type: 'text', text: 'With continuous visual monitoring, production teams gain better visibility into automated process stability. Deviation trends are identified early, allowing adjustments before quality is affected.' },
      { type: 'heading', text: 'Reduced Downtime' },
      { type: 'text', text: 'Early detection of anomalies reduces unexpected downtime. Teams can address issues during planned stops rather than reacting to line stoppages caused by undetected problems.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['Real-time visual monitoring of robotic cells', 'Early anomaly detection and alerts', 'Improved process stability and control', 'Reduced unplanned downtime', 'Faster feedback for process adjustments'] },
    ],
  },
  {
    name: 'Pharma',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_24_25-AM.jpg',
    intro: 'Installed in blister scanning lines, the cameras are capable of identifying defects such as broken or cracked pills.',
    outcome: 'Outcome is reliable QA, traceable reporting, and removal of defective items.',
    details:
      'Pharma inspection benefits from accurate blister scanning, clearer defect detection, and reporting that supports safer, more consistent output.',
    subtitle: 'Blister Scanning & Pharmaceutical QA Inspection',
    pageContent: [
      { type: 'heading', text: 'Blister Pack Inspection' },
      { type: 'text', text: 'EVS is installed on blister scanning lines where cameras inspect each cavity for defects including broken or cracked pills, missing tablets, incorrect fill, and sealing issues. Every blister is scanned at line speed without slowing production.' },
      { type: 'text', text: 'Defective blisters are flagged in real time, and the system can trigger rejection mechanisms to remove non-conforming packs from the line.' },
      { type: 'heading', text: 'Reliable Quality Assurance' },
      { type: 'text', text: 'Automated visual inspection provides consistent, repeatable quality checks that reduce reliance on manual inspection. This improves QA reliability and helps maintain compliance with pharmaceutical quality standards.' },
      { type: 'heading', text: 'Traceable Reporting' },
      { type: 'text', text: 'Inspection results are logged with batch numbers, timestamps, and defect details, creating a complete traceable record for every production run. Reports support internal quality audits and regulatory documentation.' },
      { type: 'heading', text: 'Key Benefits' },
      { type: 'list', items: ['High-speed blister pack cavity inspection', 'Detection of cracked, broken, or missing pills', 'Automatic rejection of defective packs', 'Consistent, repeatable QA inspection', 'Batch-level traceable reporting'] },
    ],
  },
]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getIndustry(slug: string) {
  return industries.find((industry) => slugify(industry.name) === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) {
    return {
      title: 'Other Industries | Edraak Systems',
      description: 'Explore how Edraak Systems can be applied across other industries.',
    }
  }

  const title = `${industry.name} | Other Industries | Edraak Systems`
  const description = industry.intro

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/other-industries/${slug}`,
      siteName: 'Edraak Systems',
      type: 'website',
      images: industry.image ? [{ url: industry.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: industry.image ? [industry.image] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/other-industries/${slug}`,
    },
  }
}

export default async function OtherIndustriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) {
    notFound()
  }

  const relatedIndustries = industries.filter((item) => slugify(item.name) !== slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/other-industries" className="text-sm font-medium text-[#02879F] hover:underline">
          ← Back to Other Industries
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#02879F]">Edraak Vision Systems</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {industry.name}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
              {industry.details}
            </p>

            <div className="mt-10 space-y-6 text-base text-gray-600">
              {industry.pageContent.map((item, i) => {
                if (item.type === 'heading') {
                  return (
                    <h2 key={i} className="text-xl font-semibold text-foreground">
                      {item.text}
                    </h2>
                  )
                }
                if (item.type === 'text') {
                  return (
                    <p key={i} className="leading-7">
                      {item.text}
                    </p>
                  )
                }
                if (item.type === 'list' && item.items) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-1">
                      {item.items.map((li, lii) => (
                        <li key={lii}>{li}</li>
                      ))}
                    </ul>
                  )
                }
                return null
              })}
            </div>
          </div>

          <div className="bg-white border flex flex-col overflow-hidden shadow-sm">
            <div className="h-80 bg-gray-100">
              <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-semibold text-foreground">Related Industries</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedIndustries.map((item, index) => (
              <Link
                key={item.name}
                href={`/other-industries/${slugify(item.name)}`}
                className="block overflow-hidden shadow-sm"
                style={{ backgroundColor: '#05032A' }}
              >
                <div className="h-48">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/60">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-200">{item.intro}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
