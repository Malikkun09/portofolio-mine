import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import SectionHeader from '../components/SectionHeader'
import { ExternalLink, Code2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'API Downloader',
    description: 'Layanan API untuk mengunduh konten dengan manajemen database dan endpoint yang rapi.',
    tags: ['Node.js', 'Express', 'MySQL'],
    gradient: 'from-[#4F46E5] to-[#7C3AED]',
  },
  {
    title: 'JKN Mobile & Desktop Powered AI',
    description: 'Aplikasi yang menggabungkan frontend modern dan fitur AI untuk membantu pengguna JKN.',
    tags: ['React', 'Electron', 'AI'],
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    title: 'Courtline Website',
    description: 'Website informasi dan layanan dengan fokus pada desain bersih dan performa cepat.',
    tags: ['Next.js', 'TailwindCSS', 'UI/UX'],
    gradient: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    title: 'Kehadiran Data Guru dan Siswa',
    description: 'Sistem pencatatan kehadiran berbasis web untuk guru dan siswa di lingkungan sekolah.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    gradient: 'from-[#EC4899] to-[#BE185D]',
  },
  {
    title: 'Media 2 Link',
    description: 'Tool sederhana untuk mengelola dan membagikan beberapa tautan media dalam satu halaman.',
    tags: ['React', 'Vite', 'REST API'],
    gradient: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  {
    title: 'Chat with Media Sosial',
    description: 'Eksperimen integrasi chat ke media sosial dengan fokus pada automasi dan workflow.',
    tags: ['Node.js', 'Webhooks', 'API'],
    gradient: 'from-[#06B6D4] to-[#0891B2]',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.project-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [sectionRef, gridRef])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full py-24 md:py-32 px-6 md:px-[8vw]"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader label="PROJECTS" heading="Featured Work" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              {/* Image Area */}
              <div className="aspect-video overflow-hidden bg-[#1A1A22]">
                <div
                  className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 flex items-center justify-center`}
                >
                  <span className="text-white/30 font-bold text-4xl">{project.title[0]}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-text-primary font-semibold text-lg">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent-blue/15 text-accent-blue rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-4">
                  <button
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                    aria-label="View source code"
                  >
                    <Code2 size={18} />
                  </button>
                  <button
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                    aria-label="View live project"
                  >
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
