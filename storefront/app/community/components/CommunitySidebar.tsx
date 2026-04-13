"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Building2,
  DollarSign,
  PlusCircle,
  Users,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { BOWLS, COMMUNITY_STATS } from "../data/mock-data";

const NAV_ITEMS = [
  { href: "/community", label: "Accueil", icon: Home },
  { href: "/community/feed", label: "Fil de discussion", icon: BookOpen },
  { href: "/community/trending", label: "Tendances", icon: TrendingUp },
  { href: "/community/companies", label: "Entreprises", icon: Building2 },
  { href: "/community/salaires", label: "Salaires", icon: DollarSign },
];

export default function CommunitySidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-5">
      {/* CTA Poster */}
      <Link
        href="/community/new-post"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm text-sm"
      >
        <PlusCircle size={16} />
        Créer une discussion
      </Link>

      {/* Navigation principale */}
      <nav className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Navigation
          </span>
        </div>
        <ul className="py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/community"
                ? pathname === "/community"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-medium border-r-2 border-emerald-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bowls */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Catégories
          </span>
          <Link
            href="/community/bowls"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Tout voir
          </Link>
        </div>
        <ul className="py-1">
          {BOWLS.slice(0, 7).map((bowl) => (
            <li key={bowl.id}>
              <Link
                href={`/community/bowl/${bowl.slug}`}
                className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group ${
                  pathname === `/community/bowl/${bowl.slug}`
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : ""
                }`}
              >
                <span className="text-base">{bowl.icon}</span>
                <span className="flex-1 truncate">{bowl.name}</span>
                <ChevronRight
                  size={12}
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Statistiques communauté */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} />
          <span className="text-sm font-semibold">Communauté</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xl font-black">
              {COMMUNITY_STATS.totalMembers.toLocaleString("fr-MA")}
            </div>
            <div className="text-xs text-emerald-200">Membres</div>
          </div>
          <div>
            <div className="text-xl font-black">
              {COMMUNITY_STATS.activeToday.toLocaleString("fr-MA")}
            </div>
            <div className="text-xs text-emerald-200">Actifs aujourd'hui</div>
          </div>
          <div>
            <div className="text-xl font-black">
              {COMMUNITY_STATS.postsThisWeek.toLocaleString("fr-MA")}
            </div>
            <div className="text-xs text-emerald-200">Posts cette semaine</div>
          </div>
          <div>
            <div className="text-xl font-black">
              {COMMUNITY_STATS.companiesListed}
            </div>
            <div className="text-xs text-emerald-200">Entreprises</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Espace anonyme 🇲🇦</span>
          <br />
          Tous les avis sont anonymes. Partagez librement, respectez la communauté.
          Aucune info personnelle ne sera divulguée.
        </p>
      </div>
    </aside>
  );
}
