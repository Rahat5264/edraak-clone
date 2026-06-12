'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    title: 'AI-Powered Software Engineering',
    text: 'We design and build scalable AI-driven software systems that automate workflows, improve decision-making, and accelerate digital transformation for enterprises.',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/06/AI-POWERED-SOFTWARE.webp',
  },
  {
    title: 'Cloud & DevOps Intelligence',
    text: 'We implement intelligent cloud architectures with automated CI/CD pipelines, monitoring systems, and optimized infrastructure for high-performance applications.',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/06/cloud-storage-background-business-network-design-1-scaled.jpg',
  },
  {
    title: 'Smart Automation Systems',
    text: 'We build end-to-end automation ecosystems that integrate AI, APIs, and business logic to eliminate manual processes and improve operational efficiency.',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

const offerServices = [
  {
    title: 'App Development',
    subtitle: '400+ Apps Developed',
    desc: 'From iOS to Android, build innovative apps that deliver seamless user experiences designed for today\'s mobile-first world. We handle design, backend, and store deployment.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C8 2 8 6 8 6v12c0 0 0 4 4 4s4-4 4-4V6s0-4-4-4z" />
        <path d="M9 18h6" />
        <rect x="10" y="3" width="4" height="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Web App Development',
    subtitle: '100+ Web Apps Developed',
    desc: 'We create scalable, secure, high-performance web applications that drive business growth and digital transformation. Modern frameworks, real-time features, and enterprise-grade architecture.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 4h16v12H4z" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
  {
    title: 'Software Development',
    subtitle: '80+ Softwares Developed',
    desc: 'Custom software solutions that streamline operations, improve efficiency, and solve complex business problems. From ERPs to analytics platforms, fully tailored.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 7l8-4 8 4-8 4-8-4z" />
        <path d="M4 7v6l8 4 8-4V7" />
        <path d="M4 13v4l8 4 8-4v-4" />
      </svg>
    ),
  },
  {
    title: 'UI / UX Design',
    subtitle: '300+ Designs Delivered',
    desc: 'We craft intuitive and modern UI/UX designs focused on user behavior, engagement, and conversion optimization. Prototyping, research, and design systems.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
]

const portfolioProjects = [
  {
    id: 1,
    name: 'Sarah Johnson',
    designation: 'CTO, FinTech Innovations',
    projectTitle: 'AI-Powered Trading Platform',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    caseStudy: 'Developed an intelligent trading platform using machine learning algorithms that analyze market patterns in real-time. The system achieved 40% faster trade execution and 25% improved prediction accuracy, resulting in $15M+ additional annual revenue.',
    tags: ['AI', 'Machine Learning', 'FinTech'],
    align: 'right'
  },
  {
    id: 2,
    name: 'Michael Chen',
    designation: 'Director of Operations, HealthCare Plus',
    projectTitle: 'Smart Patient Management System',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    caseStudy: 'Built an IoT-integrated patient monitoring system that reduced hospital readmission rates by 35%. Automated scheduling and AI-driven diagnostics helped streamline workflows across 12 departments, saving over 2,000 staff hours monthly.',
    tags: ['Healthcare', 'IoT', 'Automation'],
    align: 'left'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    designation: 'CEO, EcoRetail Group',
    projectTitle: 'Sustainable E-commerce Ecosystem',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    caseStudy: 'Created a full-scale e-commerce platform with carbon footprint tracking, smart logistics, and personalized recommendations. Achieved 210% increase in conversion rate, 3.5M+ monthly active users, and 45% reduction in delivery emissions.',
    tags: ['E-commerce', 'Sustainability', 'Analytics'],
    align: 'right'
  }
]

const solutionsData = [
  {
    category: 'Startups',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 6v6l4 2m-4-8a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" />
        <path d="M12 3v3M3 12h3m12 0h3M12 21v-3" />
      </svg>
    ),
    services: [
      'Startup App Development',
      'Startup Prototype',
      'E-Commerce Development'
    ]
  },
  {
    category: 'SMB',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
      </svg>
    ),
    services: [
      'Flutter App Development',
      'Mobile App Support',
      'Wearable App Development'
    ]
  },
  {
    category: 'Enterprise',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 12h3m12 0h3M5 6l14 12m0-12L5 18M4 21h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
      </svg>
    ),
    services: [
      'IT Staff Augmentation',
      'Blockchain Development',
      'IP Protection'
    ]
  }
]

const businessDomains = [
  {
    name: 'On-Demand Services',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    description: 'Real-time delivery, ride-sharing, and service booking platforms'
  },
  {
    name: 'Health & Fitness',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4.5 12.75l6 6 9-13.5" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
    description: 'Telemedicine, wellness apps, and fitness tracking solutions'
  },
  {
    name: 'Smart Logistics',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.616-1.53a15.04 15.04 0 0 0-2.008-1.68M6.75 18.75H6" />
      </svg>
    ),
    description: 'Route optimization, fleet management, and delivery automation'
  },
  {
    name: 'E-Commerce',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
    description: 'Multi-vendor marketplaces, D2C platforms, and payment gateways'
  },
  {
    name: 'Travel & Tourism',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    description: 'Booking engines, itinerary planners, and travel marketplaces'
  },
  {
    name: 'Real Estate',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    description: 'Property listings, VR tours, and mortgage management'
  },
  {
    name: 'EdTech',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4.26 10.147a60.438 60.438 0 0 1-.491-6.538A2.25 2.25 0 0 1 6.2 1.77l1.732.866a.75.75 0 0 0 .548.12 60.449 60.449 0 0 1 7.042 0 .75.75 0 0 0 .548-.12l1.732-.866a2.25 2.25 0 0 1 2.43 1.84 60.44 60.44 0 0 1-.492 6.538m-11.77 0A60.44 60.44 0 0 0 12 10.75a60.44 60.44 0 0 0 5.74-.603m-11.77 0A60.44 60.44 0 0 0 3 15.75c0 2.25 1.5 4.5 4.5 6m7.5-6v6m0-6h3m-3 0h-3" />
      </svg>
    ),
    description: 'LMS platforms, virtual classrooms, and interactive learning'
  },
  {
    name: 'Media & Entertainment',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    description: 'Streaming platforms, content management, and social media apps'
  }
]

const darkBlue = '#0a2540'

export default function ServicesPage() {
  const [heroIndex, setHeroIndex] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setHeroIndex(index)
  }

  const nextSlide = () => {
    setHeroIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setHeroIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {/* ENHANCED HERO SLIDER SECTION - AUTO SLIDING */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === heroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className={`h-full w-full object-cover transition-transform duration-10000 ${
                i === heroIndex ? 'scale-110' : 'scale-100'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
            
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-5xl px-6 md:px-12 lg:px-20">
                <div className={`overflow-hidden transition-all duration-700 delay-200 ${
                  i === heroIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Innovation Meets Excellence
                  </span>
                </div>
                
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl transition-all duration-700 delay-300 ${
                  i === heroIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}>
                  {s.title}
                </h1>
                
                <p className={`mt-6 text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${
                  i === heroIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}>
                  {s.text}
                </p>
                
                <div className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 delay-700 ${
                  i === heroIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <button className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    Get Started
                  </button>
                  <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === heroIndex
                  ? 'w-10 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        <div className="absolute bottom-8 right-8 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
          {String(heroIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* REST OF YOUR COMPONENT REMAINS EXACTLY THE SAME */}
      {/* BLUE BACKGROUND SECTION - Services We Offer */}
      <section className="py-28" style={{ backgroundColor: darkBlue }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Services We Offer:
            </h2>
            <p className="text-xl md:text-2xl font-semibold mt-3 text-blue-100">
              To Boost Your Digital Strategy
            </p>
            <div className="w-20 h-1 mx-auto mt-5 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
            <p className="text-base md:text-lg text-blue-50/90 mt-6 leading-relaxed">
              We offer end-to-end digital solutions that empower your business. From design to development,
              our expert team delivers innovative mobile apps, powerful websites, and custom solutions tailored
              to your unique needs. Let us help you transform your digital strategy and achieve success in the
              digital age through the following services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {offerServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-7 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-14 w-14 rounded-xl flex items-center justify-center text-white border border-white/20" style={{ backgroundColor: '#1e3a5f' }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    <p className="text-blue-200 text-base font-medium mt-0.5">{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-blue-50/80 text-sm md:text-base leading-relaxed mt-5">
                  {service.desc}
                </p>
                <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition px-5 py-2.5 rounded-full shadow-md" style={{ backgroundColor: darkBlue }}>
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/20 pt-12 text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">980+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">24/7</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Support & SLA</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">50+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Expert Engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600 mt-4">
              Real results from real partnerships — explore our featured case studies
            </p>
            <div className="w-20 h-1 mx-auto mt-5 rounded-full" style={{ backgroundColor: darkBlue }}></div>
          </div>

          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                project.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-10 items-center mb-24 last:mb-0 group`}
            >
              <div className="flex-1 w-full">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]">
                  <img
                    src={project.image}
                    alt={project.projectTitle}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 text-white text-xs font-semibold rounded-full"
                      style={{ backgroundColor: darkBlue }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  {project.projectTitle}
                </h3>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: darkBlue }}>
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-lg">{project.name}</p>
                    <p className="text-sm font-medium" style={{ color: darkBlue }}>{project.designation}</p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-base pl-5 py-1 bg-slate-50 rounded-r-lg" style={{ borderLeftWidth: '4px', borderLeftColor: darkBlue }}>
                  {project.caseStudy}
                </p>

                <button className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-xl" style={{ backgroundColor: darkBlue }}>
                  Read Full Case Study
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 font-semibold rounded-full transition-all duration-300" style={{ borderColor: darkBlue, color: darkBlue }}>
              View All Projects →
            </button>
          </div>
        </div>
      </section>

      {/* We Develop Solutions Section */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              We Develop Solutions!
            </h2>
            <p className="text-xl md:text-2xl font-semibold mt-3" style={{ color: darkBlue }}>
              Catering To Every Business Need
            </p>
            <div className="w-20 h-1 mx-auto mt-5 rounded-full" style={{ backgroundColor: darkBlue }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutionsData.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                <div className="p-6 text-white flex items-center gap-4" style={{ backgroundColor: darkBlue }}>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {item.category}
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-3">
                    {item.services.map((service, serviceIdx) => (
                      <li key={serviceIdx} className="flex items-center gap-2 text-slate-700">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={darkBlue} strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm md:text-base">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              Tailored solutions for businesses of all sizes — from early-stage startups to global enterprises
            </p>
          </div>
        </div>
      </section>

      {/* We Serve Section */}
      <section className="py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              We Serve
            </h2>
            <p className="text-xl md:text-2xl font-semibold mt-3" style={{ color: darkBlue }}>
              A Spectrum of Business Domains
            </p>
            <div className="w-20 h-1 mx-auto mt-5 rounded-full" style={{ backgroundColor: darkBlue }}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessDomains.map((domain, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: darkBlue }}>
                  <div className="text-white">
                    {domain.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {domain.name}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  {domain.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              Empowering businesses across industries with tailored digital solutions
            </p>
          </div>
        </div>
      </section>

      {/* Let's Connect Section */}
      <section className="py-20 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            Looking to Elevate Your Digital Presence?
          </h2>
          
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a free consultation with us & discover how our cutting-edge mobile and web development solutions can transform your business.
          </p>
          
          <div className="flex justify-center">
            <Link href="/contact">
              <button className="group inline-flex items-center gap-2 px-8 py-3 font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-xl" style={{ backgroundColor: darkBlue, color: 'white' }}>
                LET'S CONNECT!
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}