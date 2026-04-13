"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  ChevronUp,
  ChevronDown,
  PlusCircle,
} from "lucide-react";
import CommunitySidebar from "../components/CommunitySidebar";
import { SALARIES, COMPANIES } from "../data/mock-data";

type SortKey = "totalComp" | "baseSalary" | "yearsExp";

const CITIES = ["Toutes les villes", "Casablanca", "Rabat", "Marrakech", "Jorf Lasfar", "Agadir"];
const LEVELS = ["Tous les niveaux", "Junior", "Mid", "Senior", "Lead"];

export default function SalairesPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Toutes les villes");
  const [level, setLevel] = useState("Tous les niveaux");
  const [sortKey, setSortKey] = useState<SortKey>("totalComp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = [...SALARIES]
    .filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.company.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === "Toutes les villes" || s.city === city;
      const matchLevel = level === "Tous les niveaux" || s.level === level;
      return matchSearch && matchCity && matchLevel;
    })
    .sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1;
      return (a[sortKey] - b[sortKey]) * mult;
    });

  // Compute averages
  const avgBase =
    filtered.length > 0
      ? Math.round(filtered.reduce((sum, s) => sum + s.baseSalary, 0) / filtered.length)
      : 0;
  const avgTC =
    filtered.length > 0
      ? Math.round(filtered.reduce((sum, s) => sum + s.totalComp, 0) / filtered.length)
      : 0;
  const maxTC = filtered.length > 0 ? Math.max(...filtered.map((s) => s.totalComp)) : 0;

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-gray-300" />;
    return sortDir === "desc" ? (
      <ChevronDown size={12} className="text-emerald-600" />
    ) : (
      <ChevronUp size={12} className="text-emerald-600" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Salaires au Maroc 💰
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Données salariales anonymes — partagées par des professionnels marocains.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <PlusCircle size={15} />
              Partager mon salaire
            </button>
          </div>

          {/* Add salary form */}
          {showAddForm && (
            <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-600" />
                Partagez votre salaire anonymement
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Poste / Titre", placeholder: "ex: Développeur Full-Stack" },
                  { label: "Entreprise", placeholder: "ex: OCP Group" },
                  { label: "Ville", placeholder: "ex: Casablanca" },
                  { label: "Années d'expérience", placeholder: "ex: 4" },
                  { label: "Salaire brut mensuel (MAD)", placeholder: "ex: 18000" },
                  { label: "Bonus annuel (MAD)", placeholder: "ex: 30000" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  🔒 Votre identité reste anonyme — aucune donnée personnelle collectée.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
                    Soumettre
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <DollarSign size={20} className="text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-gray-900">
                {avgBase.toLocaleString("fr-MA")}
              </div>
              <div className="text-xs text-gray-500">MAD brut moyen / mois</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <TrendingUp size={20} className="text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-black text-gray-900">
                {Math.round(avgTC / 1000)}k
              </div>
              <div className="text-xs text-gray-500">MAD TC moyen / an</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <Briefcase size={20} className="text-purple-500 mx-auto mb-1" />
              <div className="text-2xl font-black text-gray-900">
                {Math.round(maxTC / 1000)}k
              </div>
              <div className="text-xs text-gray-500">MAD TC max / an</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un poste ou une entreprise…"
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <MapPin size={12} />
              </span>
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    city === c
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <Briefcase size={12} />
              </span>
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    level === l
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>Poste & Entreprise</span>
              <button
                onClick={() => handleSort("baseSalary")}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
              >
                Base / mois <SortIcon col="baseSalary" />
              </button>
              <span>Bonus / an</span>
              <button
                onClick={() => handleSort("totalComp")}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
              >
                TC / an <SortIcon col="totalComp" />
              </button>
              <button
                onClick={() => handleSort("yearsExp")}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
              >
                Exp <SortIcon col="yearsExp" />
              </button>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
              {filtered.map((sal) => (
                <div
                  key={sal.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-4 py-3.5 hover:bg-gray-50 transition-colors items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{sal.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Link
                        href={`/community/company/${sal.companySlug}`}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                      >
                        {sal.company}
                      </Link>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="flex items-center gap-0.5 text-xs text-gray-400">
                        <MapPin size={10} />
                        {sal.city}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {sal.level}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {sal.baseSalary.toLocaleString("fr-MA")}
                    <span className="text-xs font-normal text-gray-400 ml-0.5">MAD</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    {sal.bonus.toLocaleString("fr-MA")}
                    <span className="text-xs text-gray-400 ml-0.5">MAD</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">
                    {Math.round(sal.totalComp / 1000)}k
                    <span className="text-xs font-normal text-gray-400 ml-0.5">MAD</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={11} />
                    {sal.yearsExp} ans
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <DollarSign size={32} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Aucune donnée salariale trouvée.</p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center">
            {filtered.length} entrée{filtered.length > 1 ? "s" : ""} · Données anonymes partagées par la communauté
          </p>
        </div>

        <CommunitySidebar />
      </div>
    </div>
  );
}
