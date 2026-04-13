'use client'

import { useState, useRef } from 'react'
import {
  MapPin,
  Search,
  Loader2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeocodeLocation {
  lat: number
  lng: number
}

interface GeocodeFields {
  timezone?: string
  congressional_district?: string
  census_tract?: string
  county_fips?: string
  state_legislature_upper?: string
  state_legislature_lower?: string
  school_district?: string
  msa?: string
  zip4?: string
  accuracy_type?: string
  source?: string
}

interface GeocodeResult {
  number?: string
  predirectional?: string
  street?: string
  suffix?: string
  city?: string
  county?: string
  state?: string
  zip?: string
  country?: string
  formatted_address: string
  location: GeocodeLocation
  accuracy: number
  accuracy_type: string
  source: string
  fields?: GeocodeFields
}

interface GeocodeResponse {
  input: {
    address_components: {
      number?: string
      street?: string
      city?: string
      state?: string
      zip?: string
      country?: string
    }
    formatted_address: string
  }
  results: GeocodeResult[]
}

// ─── Mock Geocodio-style geocoder ─────────────────────────────────────────────

function mockGeocode(address: string): GeocodeResponse {
  // Parse the address very simply for demo purposes
  const trimmed = address.trim()
  const lower = trimmed.toLowerCase()

  // Some preset results for realistic demo
  const presets: Record<string, GeocodeResponse> = {
    default: {
      input: {
        address_components: {
          number: '1600',
          street: 'Pennsylvania Ave NW',
          city: 'Washington',
          state: 'DC',
          zip: '20500',
          country: 'US',
        },
        formatted_address: trimmed,
      },
      results: [
        {
          number: '1600',
          predirectional: '',
          street: 'Pennsylvania Ave NW',
          suffix: '',
          city: 'Washington',
          county: 'District of Columbia',
          state: 'DC',
          zip: '20500',
          country: 'US',
          formatted_address: trimmed || '1600 Pennsylvania Ave NW, Washington, DC 20500',
          location: { lat: 38.8977, lng: -77.0365 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'TIGER/Line® dataset from the US Census Bureau',
          fields: {
            timezone: 'America/New_York',
            congressional_district: 'DC-00 (At-Large)',
            census_tract: '11001006202.00',
            county_fips: '11001',
            state_legislature_upper: 'District of Columbia',
            state_legislature_lower: 'District of Columbia',
            school_district: 'District of Columbia Public Schools',
            msa: 'Washington-Arlington-Alexandria, DC-VA-MD-WV',
            zip4: '0005',
            accuracy_type: 'rooftop',
            source: 'TIGER/Line®',
          },
        },
      ],
    },
  }

  // Detect some cities for variety
  if (lower.includes('new york') || lower.includes('nyc') || lower.includes('manhattan')) {
    return {
      input: { address_components: { city: 'New York', state: 'NY', country: 'US' }, formatted_address: trimmed },
      results: [{
        city: 'New York',
        county: 'New York County',
        state: 'NY',
        zip: '10001',
        country: 'US',
        formatted_address: trimmed,
        location: { lat: 40.7128, lng: -74.006 },
        accuracy: 0.9,
        accuracy_type: 'place',
        source: 'TIGER/Line® dataset from the US Census Bureau',
        fields: {
          timezone: 'America/New_York',
          congressional_district: 'NY-12',
          census_tract: '36061015900.00',
          county_fips: '36061',
          state_legislature_upper: 'NY-27',
          state_legislature_lower: 'NY-65',
          school_district: 'New York City Geographic District #1',
          msa: 'New York-Newark-Jersey City, NY-NJ-PA',
          zip4: '0001',
        },
      }],
    }
  }

  if (lower.includes('casablanca') || lower.includes('maroc') || lower.includes('morocco') || lower.includes('rabat')) {
    return {
      input: { address_components: { city: 'Casablanca', country: 'MA' }, formatted_address: trimmed },
      results: [{
        city: 'Casablanca',
        county: 'Grand Casablanca-Settat',
        state: 'MA',
        zip: '20000',
        country: 'MA',
        formatted_address: trimmed,
        location: { lat: 33.5731, lng: -7.5898 },
        accuracy: 0.88,
        accuracy_type: 'place',
        source: 'OpenStreetMap / GeoNames',
        fields: {
          timezone: 'Africa/Casablanca',
          census_tract: '212 01 00',
          county_fips: 'MA-CAS',
          msa: 'Grand Casablanca',
          zip4: 'N/A',
        },
      }],
    }
  }

  if (lower.includes('los angeles') || lower.includes(' la ') || lower.includes('los angeles')) {
    return {
      input: { address_components: { city: 'Los Angeles', state: 'CA', country: 'US' }, formatted_address: trimmed },
      results: [{
        city: 'Los Angeles',
        county: 'Los Angeles County',
        state: 'CA',
        zip: '90012',
        country: 'US',
        formatted_address: trimmed,
        location: { lat: 34.0522, lng: -118.2437 },
        accuracy: 0.95,
        accuracy_type: 'street_center',
        source: 'TIGER/Line® dataset from the US Census Bureau',
        fields: {
          timezone: 'America/Los_Angeles',
          congressional_district: 'CA-34',
          census_tract: '06037207400.00',
          county_fips: '06037',
          state_legislature_upper: 'CA-24',
          state_legislature_lower: 'CA-51',
          school_district: 'Los Angeles Unified School District',
          msa: 'Los Angeles-Long Beach-Anaheim, CA',
          zip4: '0002',
        },
      }],
    }
  }

  return presets.default
}

// ─── Accuracy badge ───────────────────────────────────────────────────────────

function AccuracyBadge({ type, score }: { type: string; score: number }) {
  const colors: Record<string, string> = {
    rooftop: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    street_center: 'bg-blue-100 text-blue-700 border-blue-200',
    place: 'bg-amber-100 text-amber-700 border-amber-200',
    zip_code: 'bg-orange-100 text-orange-700 border-orange-200',
  }
  const color = colors[type] || 'bg-slate-100 text-slate-700 border-slate-200'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${color}`}>
      <CheckCircle2 className="h-3 w-3" />
      {type} · {Math.round(score * 100)}%
    </span>
  )
}

// ─── JSON viewer ──────────────────────────────────────────────────────────────

function JsonBlock({ data }: { data: object }) {
  const [copied, setCopied] = useState(false)
  const text = JSON.stringify(data, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs font-mono text-slate-500">JSON Response</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-80 leading-relaxed">
        <code>{text}</code>
      </pre>
    </div>
  )
}

// ─── Field table ──────────────────────────────────────────────────────────────

const FIELD_LABELS: Record<string, string> = {
  timezone: '🕐 Timezone',
  congressional_district: '🏛️ Congressional District',
  census_tract: '📊 Census Tract',
  county_fips: '🔢 County FIPS',
  state_legislature_upper: '⬆️ State Legislature (Upper)',
  state_legislature_lower: '⬇️ State Legislature (Lower)',
  school_district: '🏫 School District',
  msa: '🌆 Metro Area (MSA)',
  zip4: '📮 ZIP+4',
}

function AppendFieldsTable({ fields }: { fields: GeocodeFields }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Append Fields</p>
      </div>
      <div className="divide-y divide-slate-100">
        {Object.entries(FIELD_LABELS).map(([key, label]) => {
          const val = fields[key as keyof GeocodeFields]
          return (
            <div key={key} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/50 transition-colors">
              <span className="text-sm text-slate-500">{label}</span>
              <span className={`text-sm font-medium ${val ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                {val || '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Map pin SVG ──────────────────────────────────────────────────────────────

function MiniMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="relative w-full h-40 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Crosshair */}
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
        </div>
        <div className="mt-2 px-3 py-1 rounded-lg bg-white/90 border border-slate-200 shadow-sm text-xs font-mono text-slate-700">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface GeocodeDemoProps {
  compact?: boolean
  defaultAddress?: string
}

export default function GeocodeDemo({ compact = false, defaultAddress = '' }: GeocodeDemoProps) {
  const [address, setAddress] = useState(defaultAddress)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeocodeResponse | null>(null)
  const [showJson, setShowJson] = useState(false)
  const [showFields, setShowFields] = useState(true)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    '1600 Pennsylvania Ave NW, Washington DC',
    '525 University Ave, Toronto, ON',
    'Casablanca, Maroc',
    '350 5th Ave, New York, NY 10118',
    '1 Infinite Loop, Cupertino, CA',
  ]

  const handleGeocode = async (addr?: string) => {
    const query = addr ?? address
    if (!query.trim()) {
      setError('Veuillez entrer une adresse.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    // Simulate API latency
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))

    const res = mockGeocode(query)
    setResult(res)
    setLoading(false)
  }

  const firstResult = result?.results?.[0]

  return (
    <div className={`w-full ${compact ? '' : 'max-w-3xl mx-auto'}`}>
      {/* ── Search bar ── */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-400 transition-all shadow-sm">
          <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGeocode()}
            placeholder="Entrez une adresse, ville ou code postal..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {address && (
            <button
              onClick={() => { setAddress(''); setResult(null); inputRef.current?.focus() }}
              className="text-slate-300 hover:text-slate-500 text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => handleGeocode()}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? 'Géocodage...' : 'Geocoder'}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Suggestions ── */}
      {!result && !loading && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2 font-medium">Essayez une adresse :</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setAddress(s); handleGeocode(s) }}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="mt-6 space-y-4 animate-pulse">
          <div className="h-10 bg-slate-100 rounded-xl w-2/3" />
          <div className="h-40 bg-slate-100 rounded-xl" />
          <div className="h-64 bg-slate-100 rounded-xl" />
        </div>
      )}

      {/* ── Results ── */}
      {result && firstResult && !loading && (
        <div className="mt-6 space-y-4">
          {/* Address header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <p className="text-sm font-bold text-slate-900">{firstResult.formatted_address}</p>
              </div>
              <div className="flex items-center gap-2 ml-6 flex-wrap">
                <AccuracyBadge type={firstResult.accuracy_type} score={firstResult.accuracy} />
                <span className="text-xs text-slate-400">Source : {firstResult.source.split('/')[0]}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-500 whitespace-nowrap bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">
              {firstResult.location.lat.toFixed(6)}, {firstResult.location.lng.toFixed(6)}
            </div>
          </div>

          {/* Components grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Numéro', value: firstResult.number },
              { label: 'Rue', value: firstResult.street },
              { label: 'Ville', value: firstResult.city },
              { label: 'Comté', value: firstResult.county },
              { label: 'État', value: firstResult.state },
              { label: 'Code Postal', value: firstResult.zip },
            ].map(({ label, value }) => (
              value ? (
                <div key={label} className="px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-800">{value}</p>
                </div>
              ) : null
            ))}
          </div>

          {/* Mini map */}
          <MiniMap lat={firstResult.location.lat} lng={firstResult.location.lng} />

          {/* Append fields */}
          {firstResult.fields && (
            <div>
              <button
                onClick={() => setShowFields(!showFields)}
                className="flex items-center gap-2 w-full text-sm font-semibold text-slate-700 mb-3"
              >
                {showFields ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                Append Fields
                <span className="text-xs font-normal text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full ml-auto">
                  {Object.keys(firstResult.fields).length} champs
                </span>
              </button>
              {showFields && <AppendFieldsTable fields={firstResult.fields} />}
            </div>
          )}

          {/* JSON toggle */}
          <div>
            <button
              onClick={() => setShowJson(!showJson)}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
              {showJson ? 'Masquer' : 'Voir'} la réponse JSON brute
              {showJson ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {showJson && (
              <div className="mt-3">
                <JsonBlock data={result} />
              </div>
            )}
          </div>

          {/* Multiple results note */}
          {result.results.length > 1 && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              {result.results.length} résultats trouvés — affichage du plus précis.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
