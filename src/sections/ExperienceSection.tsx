import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    date: '2026',
    role: 'Full Stack Developer (Personal Project)',
    company: 'SkillMatch SMK / KerjaIn From Dicoding',
    description:
      'Membangun platform full-stack dengan React (Vite) + TailwindCSS dan Laravel 12. Mengimplementasikan AI roadmap generator dan autentikasi Laravel Sanctum. Fokus pada UI/UX yang modern dan usable.',
  },
  {
    date: '2025',
    role: 'Hackathon Participant',
    company: 'BPJS Hackathon & Web KulinaAI Powered with AI',
    description:
      'Berkolaborasi dalam tim untuk membuat prototipe dalam waktu terbatas. Berkontribusi pada pengembangan frontend dan integrasi API. Fokus pada problem solving dan presentasi solusi kepada juri.',
  },
  {
    date: '2024 \u2014 2025',
    role: 'Frontend Developer (Self Project)',
    company: 'Various Web Portfolio & UI Projects',
    description:
      'Membangun website responsif menggunakan HTML, CSS, dan JavaScript. Berlatih tren UI modern seperti glassmorphism, dark theme, dan elemen 3D. Mengasah UX lewat layout dan interaction design.',
  },
  {
    date: '2024',
    role: 'Learning Phase \u2014 Web Development',
    company: 'Self Learning',
    description:
      'Belajar dasar HTML, CSS, JavaScript. Mulai eksplor React dan arsitektur berbasis komponen. Membuat mini project dan cloning UI untuk memperkuat fundamental.',
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Timeline line draw animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Timeline items
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('.timeline-item')
      const dots = itemsRef.current.querySelectorAll('.timeline-dot')

      items.forEach((item, i) => {
        const isLeft = i % 2 === 0
        gsap.fromTo(
          item,
          { opacity: 0, x: isLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Dots bounce
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }
  }, [sectionRef, lineRef, itemsRef])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full py-24 md:py-32 px-6 md:px-[8vw]"
    >
      <div className="max-w-[800px] mx-auto">
        <SectionHeader label="EXPERIENCE" heading="Experience" />

        <div ref={itemsRef} className="relative">
          {/* Timeline Line - Desktop (center) */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border origin-top"
          />

          {/* Timeline Line - Mobile (left) */}
          <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={i}
                className={`timeline-item relative flex items-start mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot - Desktop */}
                <div
                  className={`timeline-dot hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg z-10 mt-6`}
                />

                {/* Dot - Mobile */}
                <div className="timeline-dot md:hidden absolute left-[11px] -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg z-10 mt-6" />

                {/* Content Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-[45%] ${
                    isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
                    <p className="text-accent-blue font-medium text-xs mb-2">
                      {exp.date}
                    </p>
                    <h3 className="text-text-primary font-semibold text-lg">
                      {exp.role}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1">{exp.company}</p>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
