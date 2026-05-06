import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 3, suffix: '+', label: 'Years Programmer Junior' },
  { value: 6, suffix: '+', label: 'Project Completed' },
  { value: 60, suffix: '%', label: 'Project Selesai' },
]

const marqueeText =
  'Student \u2022 Cybersecurity Learner \u2022 Web Security \u2022 Pentesting \u2022 3D Web \u2022 '

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Profile photo entrance + float
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Content fade in
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.about-animate')
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Stats count-up
    if (statsRef.current) {
      const statEls = statsRef.current.querySelectorAll('.stat-value')
      statEls.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0')
        gsap.fromTo(
          el,
          { innerText: '0' },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }
  }, [sectionRef, photoRef, contentRef, statsRef])

  const handleContactClick = () => {
    const target = document.querySelector('#contact')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-[8vw] overflow-hidden"
    >
      {/* Scrolling Marquee Background */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-[48px] md:text-[72px] font-bold text-white/[0.04] mx-4">
            {marqueeText}
          </span>
          <span className="text-[48px] md:text-[72px] font-bold text-white/[0.04] mx-4">
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-center">
        {/* Profile Photo */}
        <div ref={photoRef} className="flex justify-center md:justify-start">
          <div className="animate-float">
            <div
              className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border-[3px] border-accent-blue/30 overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(79, 70, 229, 0.15)' }}
            >
              {/* Placeholder gradient avatar */}
              <div className="w-full h-full bg-gradient-to-br from-accent-blue/30 to-accent-purple/30 flex items-center justify-center">
                <span className="text-5xl md:text-7xl font-bold text-white/50">M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <p className="about-animate text-accent-blue font-medium text-xs tracking-[0.1em] uppercase">
            ABOUT ME
          </p>
          <h2 className="about-animate text-text-primary font-bold text-2xl md:text-4xl mt-4 tracking-tight">
            Hey! I'm Malik!
          </h2>
          <p className="about-animate text-text-secondary text-sm md:text-base mt-6 leading-[1.7] max-w-[540px]">
            Saya Muhammad Malik Fajar El-Syarif, siswa SMK Informatika Fithrah Insani. Saya fokus
            belajar di bidang cybersecurity, khususnya Application &amp; Web Security serta pentesting.
            Saya juga membangun website modern dengan teknologi 3D, responsif, dan interaktif untuk
            melatih skill frontend dan kreativitas desain.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="about-animate flex items-center gap-6 md:gap-12 mt-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-12">
                <div className="text-center md:text-left">
                  <span className="stat-value text-text-primary font-bold text-2xl md:text-3xl" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-text-primary font-bold text-2xl md:text-3xl">{stat.suffix}</span>
                  <p className="text-text-secondary text-xs md:text-sm mt-1">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-10 bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="about-animate mt-10">
            <p className="text-text-primary font-semibold text-lg mb-4">
              Got a project in mind? Let's talk!
            </p>
            <button
              onClick={handleContactClick}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
