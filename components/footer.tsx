import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react"

const quickLinks = [
  { label: "About us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Membership", href: "/membership" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact Us", href: "/contact" },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a", color: "#e5e5e5" }}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Quick Links */}
          <div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#E8520A] transition-colors"
                    style={{ color: "#cccccc" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@baa.org.in"
                className="flex items-center gap-3 text-sm hover:text-[#E8520A] transition-colors"
                style={{ color: "#cccccc" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  <Mail className="h-4 w-4 text-white" />
                </span>
                info@baa.org.in
              </a>
              <a
                href="tel:+919711916996"
                className="flex items-center gap-3 text-sm hover:text-[#E8520A] transition-colors"
                style={{ color: "#cccccc" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </span>
                +91-9711916996
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: "#333333" }}
              >
                <Facebook className="h-4 w-4 text-white" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: "#333333" }}
              >
                <Linkedin className="h-4 w-4 text-white" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: "#333333" }}
              >
                <Instagram className="h-4 w-4 text-white" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: "#333333" }}
              >
                <Twitter className="h-4 w-4 text-white" />
                <span className="sr-only">X / Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid #333333", color: "#888888" }}
        >
          &copy; {new Date().getFullYear()} B.A.A. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
