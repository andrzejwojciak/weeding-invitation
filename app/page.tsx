import Link from "next/link";
import { Heart, UserPlus } from "lucide-react";
import { weddingConfig, getCoupleNames } from "@/lib/config/wedding";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <Heart className="w-20 h-20 text-burgundy-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
            {getCoupleNames("first")}
          </h1>
          <p className="text-xl text-gray-300 mb-2">are getting married!</p>
          <p className="text-lg text-gray-400">{weddingConfig.date.full}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-gray-200 mb-6">
            If you&apos;ve received a personalized invitation link, please use
            it to view your invitation.
          </p>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <UserPlus size={20} />
            Admin Panel
          </Link>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          <p>Wedding Invitation Management System</p>
        </div>
      </div>
    </div>
  );
}
