import { useRef, useState, FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import SectionHeader from '../components/SectionHeader'
import { CheckCircle, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useGSAP(() => {
    if (!formRef.current) return

    const fields = formRef.current.querySelectorAll('.form-field')
    gsap.fromTo(
      fields,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [sectionRef, formRef])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !message) return

    setIsSubmitting(true)

    // TODO: Connect to MySQL-backed API when endpoint is ready.
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName('')
      setMessage('')
    }, 1500)
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary text-base placeholder:text-text-secondary/50 focus:border-accent-blue focus:shadow-[0_0_0_3px_rgba(79,70,229,0.2)] transition-all duration-200'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full py-24 md:py-32 px-6 md:px-[8vw]"
    >
      <div className="max-w-[600px] mx-auto">
        <SectionHeader
          label="CONTACT"
          heading="Let's Work Together"
          subtext="Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing."
        />

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="form-field">
            <label className="block text-text-secondary text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
              required
            />
          </div>

          {/* Message */}
          <div className="form-field">
            <label className="block text-text-secondary text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={6}
              className={`${inputClass} resize-y min-h-[150px]`}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-field">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mt-6 flex items-center gap-2 text-success font-medium text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle size={18} />
            Thanks for reaching out! I'll get back to you soon.
          </div>
        )}
      </div>
    </section>
  )
}
