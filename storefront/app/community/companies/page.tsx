"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, MapPin, Users2, Building2 } from "lucide-react";
import CommunitySidebar from "../components/CommunitySidebar";
import { COMPANIES } from "../data/mock-data";

const INDUSTRIES = [
  "Toutes",
  "Banque & Finance",
  "Télécommunications",
  "Conseil & IT",
  "BPO & Offshoring",
  "Mines & Chimie",
  "Services & Utilities",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 fill-gray-100"
          }
        />
      ))}
    </div>
  );
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("Toutes");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");

  const filtered = [...COMPANIES]
    .filter((c) => {
      const matchSearch =
        !search || c.name.toLowerCase().includes(search.toLowerCase());
      const matchIndustry =
        industry === "Toutes" || c.industry === industry;
      return matchSearch && matchIndustry;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5 min-w-0">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Entreprises au Maroc
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Avis anonymes, salaires et culture d'entreprise — vus de l'intérieur.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une entreprise…"
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Industry filter */}
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    industry === ind
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Trier par :</span>
              {(
                [
                  { key: "rating", label: "⭐ Note" },
                  { key: "reviews", label: "💬 Avis" },
                  { key: "name", label: "🔤 Nom" },
                ] as { key: typeof sortBy; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                    sortBy === opt.key
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-gray-500">
            {filtered.length} entreprise{filtered.length > 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((company) => (
              <Link
                key={company.id}
                href={`/community/company/${company.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                {/* Logo + name */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl w-14 h-14 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                    {company.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                      {company.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{company.industry}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <StarRating rating={company.rating} />
                      <span className="text-sm font-bold text-gray-800">
                        {company.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({company.reviewCount} avis)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                  {company.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {company.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users2 size={11} />
                    {company.size} employés
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={11} />
                    {company.industry}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {company.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
              <div className="text-4xl mb-3">🏢</div>
              <p className="text-gray-500 text-sm">Aucune entreprise trouvée.</p>
            </div>
          )}
        </div>

        <CommunitySidebar />
      </div>
    </div>
  );
}
