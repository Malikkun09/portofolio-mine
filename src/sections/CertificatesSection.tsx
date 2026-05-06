import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import SectionHeader from '../components/SectionHeader'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import cert1a from '../../Sertifikat/sertfikat1-1.png'
import cert1b from '../../Sertifikat/sertfikat1-2.png'
import cert2a from '../../Sertifikat/sertfikat2-1.png'
import cert2b from '../../Sertifikat/sertfikat2-2.png'
import cert3a from '../../Sertifikat/sertfikat3-1.png'
import cert3b from '../../Sertifikat/sertfikat3-2.png'
import cert4a from '../../Sertifikat/sertfikat4-1.png'
import cert4b from '../../Sertifikat/sertfikat4-2.png'
import cert4c from '../../Sertifikat/sertfikat4-3.png'
import cert5a from '../../Sertifikat/sertfikat5-1.png'
import cert5b from '../../Sertifikat/sertfikat5-2.png'
import cert5c from '../../Sertifikat/sertfikat5-3.png'
import cert6a from '../../Sertifikat/sertfikat6-1.png'
import cert6b from '../../Sertifikat/sertfikat6-2.png'
import cert6c from '../../Sertifikat/sertfikat6-3.png'
import cert7a from '../../Sertifikat/sertfikat7-1.png'
import cert7b from '../../Sertifikat/sertfikat7-2.png'
import cert8a from '../../Sertifikat/sertfikat8-1.png'
import cert8b from '../../Sertifikat/sertfikat8-2.png'
import cert8c from '../../Sertifikat/sertfikat8-3.png'
import cert8d from '../../Sertifikat/sertfikat8-4.png'
import cert9 from '../../Sertifikat/sertifikat9.png'
import cert10 from '../../Sertifikat/sertifikat10.png'

gsap.registerPlugin(ScrollTrigger)

type CertificateSet = {
  title: string
  images: string[]
  description: string
}

const certificateSets: CertificateSet[] = [
  {
    title: 'Dasar Pemrograman Web',
    images: [cert1a, cert1b],
    description: 'Sertifikat kelulusan kelas Belajar Dasar Pemrograman Web dari Dicoding, memvalidasi pemahaman fundamental HTML, CSS, dan pembuatan layout yang responsif.',
  },
  {
    title: 'Pemrograman JavaScript',
    images: [cert2a, cert2b],
    description: 'Sertifikat dari Dicoding untuk kelas Belajar Dasar Pemrograman JavaScript, membuktikan penguasaan sintaks dasar JS, manipulasi DOM, dan logika pemrograman.',
  },
  {
    title: 'Basic Course Dicoding',
    images: [cert3a, cert3b],
    description: 'Sertifikat kelulusan pengembangan aplikasi dan logika dasar dari platform Dicoding Academy.',
  },
  {
    title: 'BPJS Hackathon 2025',
    images: [cert4a, cert4b, cert4c],
    description: 'Piagam penghargaan dan sertifikat partisipasi dari event BPJS Kesehatan Hackathon 2025 dalam membangun solusi inovatif.',
  },
  {
    title: 'Web Fundamental',
    images: [cert5a, cert5b, cert5c],
    description: 'Kumpulan sertifikat penyelesaian course fundamental IT dan bahasa pemrograman dari platform belajar interaktif.',
  },
  {
    title: 'Pengembangan Frontend',
    images: [cert6a, cert6b, cert6c],
    description: 'Sertifikat keterampilan spesifik di bidang pengembangan antarmuka (frontend) dan desain responsif.',
  },
  {
    title: 'Course Backend & Data',
    images: [cert7a, cert7b],
    description: 'Sertifikat pengenalan logika pemrograman tingkat lanjut dan penanganan data dasar.',
  },
  {
    title: 'Kompetisi & Problem Solving',
    images: [cert8a, cert8b, cert8c, cert8d],
    description: 'Sertifikat pembuktian penyelesaian algoritma, struktur data, dan tantangan problem solving (seperti dari HackerRank/Sololearn).',
  },
  {
    title: 'Bootcamp / Workshop IT',
    images: [cert9],
    description: 'Sertifikat partisipasi dalam program bootcamp atau workshop seputar Web Development dan keamanan dasar.',
  },
  {
    title: 'Achievement Lainnya',
    images: [cert10],
    description: 'Sertifikat penghargaan penyelesaian misi belajar atau partisipasi dalam kegiatan edukasi teknologi.',
  },
]

type CertificateCardProps = CertificateSet & {
  onImageClick: (src: string) => void
}

function CertificateCard({ title, images, description, onImageClick }: CertificateCardProps) {
  const [index, setIndex] = useState(0)
  const total = images.length

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + total) % total)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % total)
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 transition-colors duration-300">
      <div className="relative aspect-video bg-[#111118]">
        <img
          src={images[index]}
          alt={`${title} ${index + 1}`}
          className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
          onClick={() => onImageClick(images[index])}
          loading="lazy"
        />

        {total > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto"
              aria-label={`Previous ${title} image`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto"
              aria-label={`Next ${title} image`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <span
                key={`${title}-dot-${i}`}
                className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary font-semibold text-lg">{title}</h3>
          <span className="text-text-secondary text-xs">
            {index + 1}/{total}
          </span>
        </div>
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null)

  useEffect(() => {
    if (!fullScreenImg) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault()
        setFullScreenImg(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [fullScreenImg])

  useGSAP(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.certificate-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [sectionRef, gridRef])

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="w-full py-24 md:py-32 px-6 md:px-[8vw]"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="CERTIFICATES"
          heading="Sertifikat Pencapaian"
          subtext="Kumpulan sertifikat dengan pencapaian kelulusan serta kehadiran yang saya dapatkan selama belajar dan berkarya."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificateSets.map((cert) => (
            <div key={cert.title} className="certificate-card">
              <CertificateCard {...cert} onImageClick={setFullScreenImg} />
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setFullScreenImg(null)}
        >
          <button
            onClick={() => setFullScreenImg(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
          <img
            src={fullScreenImg}
            alt="Fullscreen Certificate"
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking the actual image
          />
        </div>
      )}
    </section>
  )
}
