import type { Metadata } from "next";
import CommunityHeader from "./components/CommunityHeader";

export const metadata: Metadata = {
  title: "CaecusMA — Communauté professionnelle anonyme du Maroc",
  description:
    "Discutez de salaires, de carrière et de vie au bureau anonymement. La communauté professionnelle 100% marocaine.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />
      <main>{children}</main>
    </div>
  );
}
