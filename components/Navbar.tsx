'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  'What We Do',
  'Industries',
  'Solutions',
  'Who We Are',
  'Resources',
  'Careers',
  'Gallery',
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleNavScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleNavScroll)
    handleNavScroll()
    return () => window.removeEventListener('scroll', handleNavScroll)
  }, [])

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget
    const circle = document.createElement('span')
    circle.classList.add('ripple-circle')
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    circle.style.width = circle.style.height = `${size}px`
    circle.style.left = `${e.clientX - rect.left - size / 2}px`
    circle.style.top = `${e.clientY - rect.top - size / 2}px`
    btn.appendChild(circle)
    setTimeout(() => circle.remove(), 650)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="#" className="nav-logo" style={{ overflow: 'hidden' }}>
            <span className="nav-logo-inner">
              <Image
                src="/logo-white.png"
                alt="Orbit Avanya Tech logo"
                width={340}
                height={80}
                priority
                className="nav-logo-img"
              />
            </span>
          </Link>

          <nav className="nav-menu" id="navMenu">
            {navLinks.map((label) => (
              <Link key={label} href="#" className="nav-link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link
              href="#"
              className="btn btn-primary btn-sm ripple"
              onClick={handleRipple}
            >
              Book a Consultation
            </Link>
            {/* Triple-line menu icon — always visible beside the button */}
            <button
              className={`hamburger${menuOpen ? ' active' : ''}`}
              id="hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobileMenu"
      >
        {navLinks.map((label) => (
          <Link key={label} href="#" className="nav-link" onClick={closeMenu}>
            {label}
          </Link>
        ))}
        <Link
          href="#"
          className="btn btn-primary btn-sm ripple"
          onClick={(e) => { handleRipple(e); closeMenu() }}
        >
          Book a Consultation
        </Link>
      </div>
    </>
  )
}
