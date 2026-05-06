import { useRef } from 'react'
import { useGSAP } from '../hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeaderProps {
  label: string
  heading: string
  subtext?: string
  centered?: boolean
}

export default function SectionHeader({ label, heading, subtext, centered = true }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll('.header-animate')
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [containerRef])

  return (
    <div ref={containerRef} className={`mb-12 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <p className="header-animate text-accent-blue font-medium text-xs tracking-[0.1em] uppercase">
        {label}
      </p>
      <h2 className="header-animate text-text-primary font-bold text-2xl md:text-[32px] tracking-tight mt-4">
        {heading}
      </h2>
      {subtext && (
        <p className="header-animate text-text-secondary font-normal text-base mt-3 max-w-lg mx-auto">
          {subtext}
        </p>
      )}
    </div>
  )
}
