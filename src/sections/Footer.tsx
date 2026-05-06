import { Globe, Mail, Code2 } from 'lucide-react'

const socialLinks = [
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 md:px-[8vw] border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="text-text-secondary hover:text-text-primary hover:-translate-y-0.5 transition-all duration-200"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-muted text-sm">
          &copy; 2026 Malik. Built with React &amp; Three.js
        </p>
      </div>
    </footer>
  )
}
