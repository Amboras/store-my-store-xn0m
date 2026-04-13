'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin, LogIn, User, ChevronDown } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function Header() {
  const { isLoggedIn } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)
  const docsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setIsDocsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b shadow-sm'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600">
                <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
                Geo<span className="text-red-600">Data</span>
                <span className="text-xs text-slate-400 font-normal ml-1">.ma</span>
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors">
                Tarifs
              </Link>

              {/* Docs Dropdown */}
              <div className="relative" ref={docsRef}>
                <button
                  onClick={() => setIsDocsOpen(!isDocsOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                >
                  Documentation
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDocsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDocsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-slate-100 shadow-lg py-2 z-50">
                    <Link href="/faq" onClick={() => setIsDocsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <span className="text-lg">📖</span>
                      <div>
                        <p className="font-medium">Référence API</p>
                        <p className="text-xs text-slate-400">Endpoints & exemples</p>
                      </div>
                    </Link>
                    <Link href="/faq" onClick={() => setIsDocsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <span className="text-lg">🚀</span>
                      <div>
                        <p className="font-medium">Quick Start</p>
                        <p className="text-xs text-slate-400">Démarrez en 5 minutes</p>
                      </div>
                    </Link>
                    <Link href="/faq" onClick={() => setIsDocsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <span className="text-lg">🗺️</span>
                      <div>
                        <p className="font-medium">Champs Append Maroc</p>
                        <p className="text-xs text-slate-400">Wilaya, commune, CIN…</p>
                      </div>
                    </Link>
                    <Link href="/faq" onClick={() => setIsDocsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <span className="text-lg">📊</span>
                      <div>
                        <p className="font-medium">Batch CSV</p>
                        <p className="text-xs text-slate-400">Géocodage en masse</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                {isLoggedIn ? 'Dashboard' : 'Connexion'}
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                🇲🇦 Clé API gratuite
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-600">
                  <MapPin className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-slate-900">GeoData<span className="text-red-600">.ma</span></span>
              </div>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-lg font-medium border-b border-slate-100 text-slate-700">
                Tarifs
              </Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-lg font-medium border-b border-slate-100 text-slate-700">
                Documentation API
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-lg font-medium border-b border-slate-100 text-slate-700">
                À propos
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-lg font-medium border-b border-slate-100 text-slate-700">
                Contact
              </Link>
              <div className="pt-4 space-y-3">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-slate-500"
                >
                  {isLoggedIn ? 'Dashboard' : 'Connexion'}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center py-3 bg-red-600 text-white font-semibold rounded-lg"
                >
                  🇲🇦 Clé API gratuite
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
