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

interface GeocodeFieldsMA {
  timezone?: string
  wilaya?: string
  code_wilaya?: string
  province_prefecture?: string
  commune?: string
  code_commune?: string
  arrondissement?: string
  circonscription_electorale?: string
  region_administrative?: string
  code_region?: string
  code_postal?: string
  secteur_postal?: string
  cin_zone?: string
  tribunal_competent?: string
  academie_regionale?: string
  centre_sante?: string
  source?: string
  accuracy_type?: string
}

interface GeocodeResultMA {
  numero?: string
  rue?: string
  quartier?: string
  ville?: string
  commune?: string
  wilaya?: string
  code_postal?: string
  pays?: string
  formatted_address: string
  location: GeocodeLocation
  accuracy: number
  accuracy_type: string
  source: string
  fields?: GeocodeFieldsMA
}

interface GeocodeResponseMA {
  input: {
    address_components: {
      numero?: string
      rue?: string
      ville?: string
      wilaya?: string
      code_postal?: string
      pays?: string
    }
    formatted_address: string
  }
  results: GeocodeResultMA[]
}

// ─── Base de données villes marocaines ────────────────────────────────────────

const MA_DB: Record<string, GeocodeResponseMA> = {
  casablanca: {
    input: { address_components: { ville: 'Casablanca', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Casablanca',
      commune: 'Ain Chock',
      wilaya: 'Casablanca-Settat',
      code_postal: '20000',
      pays: 'MA',
      formatted_address: 'Casablanca, 20000, Maroc',
      location: { lat: 33.5731, lng: -7.5898 },
      accuracy: 0.88,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Casablanca-Settat',
        code_wilaya: '20',
        province_prefecture: 'Préfecture de Casablanca',
        commune: 'Casablanca (Ain Chock)',
        code_commune: '201101',
        arrondissement: 'Ain Chock',
        region_administrative: 'Casablanca-Settat',
        code_region: 'CAS',
        code_postal: '20000',
        secteur_postal: 'Casablanca Centre',
        cin_zone: 'BE / BH',
        circonscription_electorale: 'Casablanca-Anfa',
        tribunal_competent: 'Tribunal de Commerce de Casablanca',
        academie_regionale: 'Académie Régionale Casablanca-Settat',
        centre_sante: 'CHU Ibn Rochd',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  rabat: {
    input: { address_components: { ville: 'Rabat', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Rabat',
      commune: 'Rabat',
      wilaya: 'Rabat-Salé-Kénitra',
      code_postal: '10000',
      pays: 'MA',
      formatted_address: 'Rabat, 10000, Maroc',
      location: { lat: 34.0209, lng: -6.8416 },
      accuracy: 0.92,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Rabat-Salé-Kénitra',
        code_wilaya: '10',
        province_prefecture: 'Préfecture de Rabat',
        commune: 'Rabat',
        code_commune: '101101',
        arrondissement: 'Hassan',
        region_administrative: 'Rabat-Salé-Kénitra',
        code_region: 'RSK',
        code_postal: '10000',
        secteur_postal: 'Rabat Centre',
        cin_zone: 'A / AA',
        circonscription_electorale: 'Rabat-Hassan',
        tribunal_competent: 'Tribunal Administratif de Rabat',
        academie_regionale: 'Académie Régionale Rabat-Salé-Kénitra',
        centre_sante: 'CHU Ibn Sina',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  marrakech: {
    input: { address_components: { ville: 'Marrakech', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Marrakech',
      commune: 'Marrakech',
      wilaya: 'Marrakech-Safi',
      code_postal: '40000',
      pays: 'MA',
      formatted_address: 'Marrakech, 40000, Maroc',
      location: { lat: 31.6295, lng: -7.9811 },
      accuracy: 0.90,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Marrakech-Safi',
        code_wilaya: '40',
        province_prefecture: 'Préfecture de Marrakech',
        commune: 'Marrakech (Médina)',
        code_commune: '401101',
        arrondissement: 'Médina',
        region_administrative: 'Marrakech-Safi',
        code_region: 'MRS',
        code_postal: '40000',
        secteur_postal: 'Marrakech Médina',
        cin_zone: 'H / HH',
        circonscription_electorale: 'Marrakech-Médina',
        tribunal_competent: 'Tribunal de Première Instance de Marrakech',
        academie_regionale: 'Académie Régionale Marrakech-Safi',
        centre_sante: 'CHU Mohammed VI Marrakech',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  fes: {
    input: { address_components: { ville: 'Fès', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Fès',
      commune: 'Fès',
      wilaya: 'Fès-Meknès',
      code_postal: '30000',
      pays: 'MA',
      formatted_address: 'Fès, 30000, Maroc',
      location: { lat: 34.0181, lng: -5.0078 },
      accuracy: 0.91,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Fès-Meknès',
        code_wilaya: '30',
        province_prefecture: 'Préfecture de Fès',
        commune: 'Fès (Médina)',
        code_commune: '301101',
        arrondissement: 'Fès-Médina',
        region_administrative: 'Fès-Meknès',
        code_region: 'FM',
        code_postal: '30000',
        secteur_postal: 'Fès Médina',
        cin_zone: 'D / G',
        circonscription_electorale: 'Fès-Médina',
        tribunal_competent: 'Tribunal de Première Instance de Fès',
        academie_regionale: 'Académie Régionale Fès-Meknès',
        centre_sante: 'CHU Hassan II Fès',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  tanger: {
    input: { address_components: { ville: 'Tanger', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Tanger',
      commune: 'Tanger',
      wilaya: 'Tanger-Tétouan-Al Hoceïma',
      code_postal: '90000',
      pays: 'MA',
      formatted_address: 'Tanger, 90000, Maroc',
      location: { lat: 35.7595, lng: -5.834 },
      accuracy: 0.91,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Tanger-Tétouan-Al Hoceïma',
        code_wilaya: '90',
        province_prefecture: 'Préfecture de Tanger-Assilah',
        commune: 'Tanger',
        code_commune: '901101',
        arrondissement: 'Charf-Souani',
        region_administrative: 'Tanger-Tétouan-Al Hoceïma',
        code_region: 'TTA',
        code_postal: '90000',
        secteur_postal: 'Tanger Centre',
        cin_zone: 'TK / T',
        circonscription_electorale: 'Tanger-Assilah',
        tribunal_competent: 'Tribunal de Commerce de Tanger',
        academie_regionale: 'Académie Régionale Tanger-Tétouan-Al Hoceïma',
        centre_sante: 'Hôpital Mohammed V Tanger',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  agadir: {
    input: { address_components: { ville: 'Agadir', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Agadir',
      commune: 'Agadir',
      wilaya: 'Souss-Massa',
      code_postal: '80000',
      pays: 'MA',
      formatted_address: 'Agadir, 80000, Maroc',
      location: { lat: 30.4278, lng: -9.5981 },
      accuracy: 0.90,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Souss-Massa',
        code_wilaya: '80',
        province_prefecture: 'Préfecture d\'Agadir-Ida Ou Tanane',
        commune: 'Agadir',
        code_commune: '801101',
        arrondissement: 'Agadir (Talborjt)',
        region_administrative: 'Souss-Massa',
        code_region: 'SM',
        code_postal: '80000',
        secteur_postal: 'Agadir Centre',
        cin_zone: 'JH / JK',
        circonscription_electorale: 'Agadir Ida Ou Tanane',
        tribunal_competent: 'Tribunal de Commerce d\'Agadir',
        academie_regionale: 'Académie Régionale Souss-Massa',
        centre_sante: 'CHU Souss-Massa Agadir',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  meknes: {
    input: { address_components: { ville: 'Meknès', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Meknès',
      commune: 'Meknès',
      wilaya: 'Fès-Meknès',
      code_postal: '50000',
      pays: 'MA',
      formatted_address: 'Meknès, 50000, Maroc',
      location: { lat: 33.8935, lng: -5.5473 },
      accuracy: 0.89,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Fès-Meknès',
        code_wilaya: '50',
        province_prefecture: 'Préfecture de Meknès',
        commune: 'Meknès',
        code_commune: '501101',
        arrondissement: 'Meknès-Médina',
        region_administrative: 'Fès-Meknès',
        code_region: 'FM',
        code_postal: '50000',
        secteur_postal: 'Meknès Centre',
        cin_zone: 'EE / EF',
        circonscription_electorale: 'Meknès-Centre',
        tribunal_competent: 'Tribunal de Première Instance de Meknès',
        academie_regionale: 'Académie Régionale Fès-Meknès',
        centre_sante: 'CHU Moulay Ismail Meknès',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  oujda: {
    input: { address_components: { ville: 'Oujda', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Oujda',
      commune: 'Oujda',
      wilaya: 'Oriental',
      code_postal: '60000',
      pays: 'MA',
      formatted_address: 'Oujda, 60000, Maroc',
      location: { lat: 34.6867, lng: -1.9114 },
      accuracy: 0.89,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Oriental',
        code_wilaya: '60',
        province_prefecture: 'Préfecture d\'Oujda-Angad',
        commune: 'Oujda',
        code_commune: '601101',
        arrondissement: 'Oujda-Lala Meryem',
        region_administrative: 'Oriental',
        code_region: 'OR',
        code_postal: '60000',
        secteur_postal: 'Oujda Centre',
        cin_zone: 'F / FH',
        circonscription_electorale: 'Oujda-Angad',
        tribunal_competent: 'Tribunal de Première Instance d\'Oujda',
        academie_regionale: 'Académie Régionale de l\'Oriental',
        centre_sante: 'CHU Mohammed VI Oujda',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  kenitra: {
    input: { address_components: { ville: 'Kénitra', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Kénitra',
      commune: 'Kénitra',
      wilaya: 'Rabat-Salé-Kénitra',
      code_postal: '14000',
      pays: 'MA',
      formatted_address: 'Kénitra, 14000, Maroc',
      location: { lat: 34.261, lng: -6.5802 },
      accuracy: 0.88,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Rabat-Salé-Kénitra',
        code_wilaya: '14',
        province_prefecture: 'Province de Kénitra',
        commune: 'Kénitra',
        code_commune: '141101',
        arrondissement: 'Kénitra-Centre',
        region_administrative: 'Rabat-Salé-Kénitra',
        code_region: 'RSK',
        code_postal: '14000',
        secteur_postal: 'Kénitra Ville',
        cin_zone: 'JA / JB',
        circonscription_electorale: 'Kénitra-Centre',
        tribunal_competent: 'Tribunal de Première Instance de Kénitra',
        academie_regionale: 'Académie Régionale Rabat-Salé-Kénitra',
        centre_sante: 'Hôpital Mohammed V Kénitra',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },

  sale: {
    input: { address_components: { ville: 'Salé', pays: 'MA' }, formatted_address: '' },
    results: [{
      ville: 'Salé',
      commune: 'Salé',
      wilaya: 'Rabat-Salé-Kénitra',
      code_postal: '11000',
      pays: 'MA',
      formatted_address: 'Salé, 11000, Maroc',
      location: { lat: 34.0383, lng: -6.7986 },
      accuracy: 0.89,
      accuracy_type: 'place',
      source: 'Base nationale des adresses — Direction de la Statistique (HCP)',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: 'Rabat-Salé-Kénitra',
        code_wilaya: '11',
        province_prefecture: 'Préfecture de Salé',
        commune: 'Salé (Bettana)',
        code_commune: '111101',
        arrondissement: 'Bettana',
        region_administrative: 'Rabat-Salé-Kénitra',
        code_region: 'RSK',
        code_postal: '11000',
        secteur_postal: 'Salé Centre',
        cin_zone: 'S / SH',
        circonscription_electorale: 'Salé-Centre',
        tribunal_competent: 'Tribunal de Première Instance de Salé',
        academie_regionale: 'Académie Régionale Rabat-Salé-Kénitra',
        centre_sante: 'Hôpital Al Farabi Salé',
        source: 'HCP / Base Nationale des Adresses',
      },
    }],
  },
}

// ─── Algorithme de géocodage Maroc ────────────────────────────────────────────

function normalizeMA(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]/g, ' ')
    .trim()
}

function mockGeocodeMA(address: string): GeocodeResponseMA {
  const norm = normalizeMA(address)

  // Essai de correspondance exacte ou partielle avec la DB
  for (const [key, data] of Object.entries(MA_DB)) {
    if (norm.includes(normalizeMA(key))) {
      const res = JSON.parse(JSON.stringify(data)) as GeocodeResponseMA
      res.input.formatted_address = address
      res.results[0].formatted_address = address || res.results[0].formatted_address
      return res
    }
  }

  // Détection de numéro de rue + rue
  const streetMatch = norm.match(/^(\d+)[,\s]+(.+)/)
  const hasStreet = streetMatch !== null

  // Résultat générique Maroc si ville non reconnue
  // Tenter de détecter une ville dans la chaîne
  let detectedCity = 'Maroc'
  let detectedPostal = '00000'
  let detectedWilaya = 'Inconnue'
  let detectedLat = 31.7917
  let detectedLng = -7.0926

  // Mots-clés wilaya
  if (norm.includes('casablanca') || norm.includes('casa')) { detectedCity = 'Casablanca'; detectedPostal = '20000'; detectedWilaya = 'Casablanca-Settat'; detectedLat = 33.5731; detectedLng = -7.5898 }
  else if (norm.includes('rabat')) { detectedCity = 'Rabat'; detectedPostal = '10000'; detectedWilaya = 'Rabat-Salé-Kénitra'; detectedLat = 34.0209; detectedLng = -6.8416 }
  else if (norm.includes('marrakech') || norm.includes('marrakesh')) { detectedCity = 'Marrakech'; detectedPostal = '40000'; detectedWilaya = 'Marrakech-Safi'; detectedLat = 31.6295; detectedLng = -7.9811 }
  else if (norm.includes('fes') || norm.includes('fez')) { detectedCity = 'Fès'; detectedPostal = '30000'; detectedWilaya = 'Fès-Meknès'; detectedLat = 34.0181; detectedLng = -5.0078 }
  else if (norm.includes('tanger') || norm.includes('tangier')) { detectedCity = 'Tanger'; detectedPostal = '90000'; detectedWilaya = 'Tanger-Tétouan-Al Hoceïma'; detectedLat = 35.7595; detectedLng = -5.834 }
  else if (norm.includes('agadir')) { detectedCity = 'Agadir'; detectedPostal = '80000'; detectedWilaya = 'Souss-Massa'; detectedLat = 30.4278; detectedLng = -9.5981 }
  else if (norm.includes('meknes') || norm.includes('meknas')) { detectedCity = 'Meknès'; detectedPostal = '50000'; detectedWilaya = 'Fès-Meknès'; detectedLat = 33.8935; detectedLng = -5.5473 }
  else if (norm.includes('oujda')) { detectedCity = 'Oujda'; detectedPostal = '60000'; detectedWilaya = 'Oriental'; detectedLat = 34.6867; detectedLng = -1.9114 }
  else if (norm.includes('kenitra') || norm.includes('kentra')) { detectedCity = 'Kénitra'; detectedPostal = '14000'; detectedWilaya = 'Rabat-Salé-Kénitra'; detectedLat = 34.261; detectedLng = -6.5802 }
  else if (norm.includes('sale') || norm.includes('salé')) { detectedCity = 'Salé'; detectedPostal = '11000'; detectedWilaya = 'Rabat-Salé-Kénitra'; detectedLat = 34.0383; detectedLng = -6.7986 }
  else if (norm.includes('tetouan')) { detectedCity = 'Tétouan'; detectedPostal = '93000'; detectedWilaya = 'Tanger-Tétouan-Al Hoceïma'; detectedLat = 35.5889; detectedLng = -5.3626 }
  else if (norm.includes('laayoune') || norm.includes('ayoun')) { detectedCity = 'Laâyoune'; detectedPostal = '70000'; detectedWilaya = 'Laâyoune-Sakia El Hamra'; detectedLat = 27.1536; detectedLng = -13.2033 }
  else if (norm.includes('dakhla')) { detectedCity = 'Dakhla'; detectedPostal = '73000'; detectedWilaya = 'Dakhla-Oued Ed-Dahab'; detectedLat = 23.6848; detectedLng = -15.957 }
  else if (norm.includes('settat')) { detectedCity = 'Settat'; detectedPostal = '26000'; detectedWilaya = 'Casablanca-Settat'; detectedLat = 33.0014; detectedLng = -7.6197 }
  else if (norm.includes('beni mellal')) { detectedCity = 'Beni Mellal'; detectedPostal = '23000'; detectedWilaya = 'Béni Mellal-Khénifra'; detectedLat = 32.3372; detectedLng = -6.3498 }
  else if (norm.includes('nador')) { detectedCity = 'Nador'; detectedPostal = '62000'; detectedWilaya = 'Oriental'; detectedLat = 35.1688; detectedLng = -2.9335 }
  else if (norm.includes('el jadida') || norm.includes('eljadida')) { detectedCity = 'El Jadida'; detectedPostal = '24000'; detectedWilaya = 'Casablanca-Settat'; detectedLat = 33.2316; detectedLng = -8.5007 }
  else if (norm.includes('safi')) { detectedCity = 'Safi'; detectedPostal = '46000'; detectedWilaya = 'Marrakech-Safi'; detectedLat = 32.2994; detectedLng = -9.2372 }
  else if (norm.includes('khouribga')) { detectedCity = 'Khouribga'; detectedPostal = '25000'; detectedWilaya = 'Béni Mellal-Khénifra'; detectedLat = 32.8827; detectedLng = -6.9063 }
  else if (norm.includes('guelmim')) { detectedCity = 'Guelmim'; detectedPostal = '81000'; detectedWilaya = 'Guelmim-Oued Noun'; detectedLat = 28.9863; detectedLng = -10.0573 }
  else if (norm.includes('errachidia')) { detectedCity = 'Errachidia'; detectedPostal = '52000'; detectedWilaya = 'Drâa-Tafilalet'; detectedLat = 31.9298; detectedLng = -4.4248 }
  else if (norm.includes('ouarzazate')) { detectedCity = 'Ouarzazate'; detectedPostal = '45000'; detectedWilaya = 'Drâa-Tafilalet'; detectedLat = 30.9193; detectedLng = -6.8934 }

  const rue = hasStreet ? streetMatch[2] : norm

  return {
    input: {
      address_components: {
        numero: hasStreet ? streetMatch[1] : undefined,
        rue: hasStreet ? streetMatch[2] : undefined,
        ville: detectedCity,
        pays: 'MA',
      },
      formatted_address: address,
    },
    results: [{
      numero: hasStreet ? streetMatch[1] : undefined,
      rue: hasStreet ? rue : undefined,
      ville: detectedCity,
      wilaya: detectedWilaya,
      code_postal: detectedPostal,
      pays: 'MA',
      formatted_address: address,
      location: {
        lat: detectedLat + (Math.random() * 0.008 - 0.004),
        lng: detectedLng + (Math.random() * 0.008 - 0.004),
      },
      accuracy: hasStreet ? 0.82 : 0.75,
      accuracy_type: hasStreet ? 'range_interpolation' : 'place',
      source: 'OpenStreetMap Maroc / HCP Base Nationale des Adresses',
      fields: {
        timezone: 'Africa/Casablanca (UTC+1)',
        wilaya: detectedWilaya,
        code_wilaya: detectedPostal.substring(0, 2),
        province_prefecture: `Province/Préfecture de ${detectedCity}`,
        commune: detectedCity,
        code_commune: `${detectedPostal.substring(0, 2)}1101`,
        region_administrative: detectedWilaya,
        code_region: detectedWilaya.substring(0, 3).toUpperCase(),
        code_postal: detectedPostal,
        secteur_postal: `${detectedCity} Centre`,
        cin_zone: 'Vérification requise',
        source: 'OpenStreetMap / HCP',
      },
    }],
  }
}

// ─── Accuracy badge ───────────────────────────────────────────────────────────

function AccuracyBadge({ type, score }: { type: string; score: number }) {
  const colors: Record<string, string> = {
    rooftop: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    street_center: 'bg-blue-100 text-blue-700 border-blue-200',
    range_interpolation: 'bg-violet-100 text-violet-700 border-violet-200',
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

// ─── Append fields table ──────────────────────────────────────────────────────

const FIELD_LABELS_MA: Record<string, string> = {
  timezone: '🕐 Fuseau horaire',
  wilaya: '🗺️ Wilaya / Région',
  code_wilaya: '🔢 Code Wilaya',
  province_prefecture: '🏛️ Province / Préfecture',
  commune: '🏘️ Commune',
  code_commune: '🔢 Code Commune',
  arrondissement: '📍 Arrondissement',
  region_administrative: '🌍 Région Administrative',
  code_region: '🔠 Code Région',
  code_postal: '📮 Code Postal',
  secteur_postal: '📬 Secteur Postal',
  cin_zone: '🪪 Zone CIN',
  circonscription_electorale: '🗳️ Circonscription Électorale',
  tribunal_competent: '⚖️ Tribunal Compétent',
  academie_regionale: '🏫 Académie Régionale',
  centre_sante: '🏥 Centre de Santé',
}

function AppendFieldsTableMA({ fields }: { fields: GeocodeFieldsMA }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Champs Append — Maroc 🇲🇦</p>
        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
          {Object.values(fields).filter(Boolean).length} champs actifs
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {Object.entries(FIELD_LABELS_MA).map(([key, label]) => {
          const val = fields[key as keyof GeocodeFieldsMA]
          return (
            <div key={key} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/50 transition-colors">
              <span className="text-sm text-slate-500">{label}</span>
              <span className={`text-sm font-medium text-right max-w-[55%] ${val ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                {val || '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Mini map ─────────────────────────────────────────────────────────────────

function MiniMapMA({ lat, lng, city }: { lat: number; lng: number; city?: string }) {
  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-red-50 via-green-50 to-red-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
      {/* Maroc flag colors subtle bg */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(200,16,46,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,98,51,0.4) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-red-600" />
        </div>
        {city && (
          <div className="mt-1 px-3 py-0.5 rounded-lg bg-white/90 border border-slate-200 shadow-sm text-xs font-bold text-red-700">
            🇲🇦 {city}
          </div>
        )}
        <div className="mt-1 px-3 py-1 rounded-lg bg-white/90 border border-slate-200 shadow-sm text-xs font-mono text-slate-700">
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </div>
      </div>
    </div>
  )
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

interface GeocodeDemoProps {
  compact?: boolean
  defaultAddress?: string
}

export default function GeocodeDemo({ compact = false, defaultAddress = '' }: GeocodeDemoProps) {
  const [address, setAddress] = useState(defaultAddress)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeocodeResponseMA | null>(null)
  const [showJson, setShowJson] = useState(false)
  const [showFields, setShowFields] = useState(true)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    'Casablanca, Maroc',
    'Rabat, Avenue Hassan II',
    'Marrakech, Médina',
    'Fès, Bab Bou Jeloud',
    'Tanger, Boulevard Mohammed VI',
    'Agadir, Secteur Talborjt',
    'Meknès, Maroc',
    'Oujda, Maroc',
  ]

  const handleGeocode = async (addr?: string) => {
    const query = addr ?? address
    if (!query.trim()) {
      setError('Veuillez entrer une adresse marocaine.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    // Simulation latence API réaliste
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 500))

    const res = mockGeocodeMA(query)
    setResult(res)
    setLoading(false)
  }

  const firstResult = result?.results?.[0]

  return (
    <div className={`w-full ${compact ? '' : 'max-w-3xl mx-auto'}`}>
      {/* ── Barre de recherche ── */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-400 focus-within:border-red-400 transition-all shadow-sm">
          <MapPin className="h-4 w-4 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGeocode()}
            placeholder="Entrez une adresse marocaine, ville ou code postal..."
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
          className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? 'Géocodage...' : 'Geocoder 🇲🇦'}
        </button>
      </div>

      {/* ── Erreur ── */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Suggestions ── */}
      {!result && !loading && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2 font-medium">🇲🇦 Essayez une adresse marocaine :</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setAddress(s); handleGeocode(s) }}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-slate-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Skeleton ── */}
      {loading && (
        <div className="mt-6 space-y-4 animate-pulse">
          <div className="h-10 bg-slate-100 rounded-xl w-2/3" />
          <div className="h-44 bg-slate-100 rounded-xl" />
          <div className="h-72 bg-slate-100 rounded-xl" />
        </div>
      )}

      {/* ── Résultats ── */}
      {result && firstResult && !loading && (
        <div className="mt-6 space-y-4">
          {/* En-tête adresse */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                <p className="text-sm font-bold text-slate-900">{firstResult.formatted_address}</p>
              </div>
              <div className="flex items-center gap-2 ml-6 flex-wrap">
                <AccuracyBadge type={firstResult.accuracy_type} score={firstResult.accuracy} />
                <span className="text-xs text-slate-400">Source : {firstResult.source.split('/')[0].trim()}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-500 whitespace-nowrap bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg shrink-0">
              {firstResult.location.lat.toFixed(6)}, {firstResult.location.lng.toFixed(6)}
            </div>
          </div>

          {/* Composants d'adresse */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'N° de rue', value: firstResult.numero },
              { label: 'Rue / Quartier', value: firstResult.rue },
              { label: 'Ville', value: firstResult.ville },
              { label: 'Commune', value: firstResult.commune },
              { label: 'Wilaya', value: firstResult.wilaya },
              { label: 'Code Postal', value: firstResult.code_postal },
            ].map(({ label, value }) =>
              value ? (
                <div key={label} className="px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-800">{value}</p>
                </div>
              ) : null
            )}
          </div>

          {/* Mini carte Maroc */}
          <MiniMapMA
            lat={firstResult.location.lat}
            lng={firstResult.location.lng}
            city={firstResult.ville}
          />

          {/* Append fields Maroc */}
          {firstResult.fields && (
            <div>
              <button
                onClick={() => setShowFields(!showFields)}
                className="flex items-center gap-2 w-full text-sm font-semibold text-slate-700 mb-3"
              >
                {showFields ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                Champs Append Maroc
                <span className="text-xs font-normal text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full ml-auto">
                  {Object.values(firstResult.fields).filter(v => v && v !== 'Vérification requise').length} champs 🇲🇦
                </span>
              </button>
              {showFields && <AppendFieldsTableMA fields={firstResult.fields} />}
            </div>
          )}

          {/* JSON brut */}
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
        </div>
      )}
    </div>
  )
}
