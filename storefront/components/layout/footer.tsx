'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

export default function Footer() {
  const { policies } = usePolicies()

  const legalLinks = [
    { label: 'About', href: '/about' },
    ...(policies?.privacy_policy ? [{ label: 'Privacy Policy', href: '/privacy' }] : []),
    ...(policies?.terms_of_service ? [{ label: 'Terms of Service', href: '/terms' }] : []),
    ...(policies?.refund_policy ? [{ label: 'Refund Policy', href: '/refund-policy' }] : []),
  ]

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
                <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                Geo<span className="text-blue-400">Data</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              API de géocodage et d&apos;enrichissement d&apos;adresses. Précise, rapide et fiable.
            </p>
            <div className="mt-4 text-xs text-slate-600">
              🇲🇦 Conçu pour le Maroc & le monde
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Produit</h3>
            <ul className="space-y-3">
              {[
                { label: 'Géocodage', href: '/products' },
                { label: 'Reverse Geocoding', href: '/products' },
                { label: 'Batch API', href: '/products' },
                { label: 'Tarifs', href: '/products' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Développeurs</h3>
            <ul className="space-y-3">
              {[
                { label: 'Documentation API', href: '/faq' },
                { label: 'Quick Start', href: '/faq' },
                { label: 'Exemples de code', href: '/faq' },
                { label: 'Statut API', href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {[
                ...legalLinks,
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} GeoData API. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
            >
              Gérer les cookies
            </button>
            <span className="text-xs text-slate-700">Propulsé par Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
