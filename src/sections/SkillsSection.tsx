import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  // Frontend
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Sass', 'Three.js', 'GSAP',
  // Backend
  'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs',
  // Tools
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Linux',
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!badgesRef.current) return

    const badges = badgesRef.current.querySelectorAll('.skill-badge')
    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [sectionRef, badgesRef])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full py-24 md:py-32 px-6 md:px-[8vw]"
    >
      <div className="max-w-[900px] mx-auto">
        <SectionHeader label="MY SKILLS" heading="Technologies I Work With" />

        <div ref={badgesRef} className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="skill-badge inline-block px-4 py-2 bg-border/60 border border-border rounded-full text-text-secondary text-sm font-medium hover:border-accent-blue/50 hover:text-text-primary hover:bg-accent-blue/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              style={{
                animation: `badge-float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
