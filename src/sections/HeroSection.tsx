import { useRef, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = lazy(() => import('../components/HeroScene'))

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)

  // Scroll-linked 3D animation
  useEffect(() => {
    if (!sectionRef.current) return

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  // Entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Name character animation
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char')
      tl.fromTo(
        chars,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power3.out' }
      )
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )

    // Description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )

    // CTA buttons
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('button, a')
      tl.fromTo(
        buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.6, ease: 'power2.out' }
    )
  }, [sectionRef])

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const nameChars = 'MALIK'.split('')

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      id="hero"
    >
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: '#0A0A0F' }}
          >
            <HeroScene scrollProgressRef={scrollProgressRef} />
          </Canvas>
        </Suspense>
      </div>

      {/* Hero UI Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[8vw]">
        <h1
          ref={nameRef}
          className="font-black text-[12vw] md:text-[10vw] lg:text-[8vw] text-text-primary leading-[0.9] tracking-[-0.04em]"
          style={{ textShadow: '0 0 80px rgba(79, 70, 229, 0.2)' }}
        >
          {nameChars.map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-text-secondary text-base md:text-lg mt-4 max-w-[500px] opacity-0"
        >
          Student at SMK Informatika Fithrah Insani
        </p>

        <p
          ref={descRef}
          className="text-text-secondary text-sm md:text-base mt-6 max-w-[480px] leading-relaxed opacity-0"
        >
          Membangun website dengan teknologi 3D Object, responsif, bersemangat dalam
          bidang coding kreatif, grafis 3D, dan desain interaktif.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => handleScrollTo('#projects')}
            className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-[1.02] opacity-0"
          >
            View Work
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="px-6 py-3 bg-transparent border border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white/5 hover:border-white/50 transition-all duration-300 opacity-0"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <ChevronDown size={24} className="text-text-secondary animate-bounce-slow" />
      </div>
    </section>
  )
}
