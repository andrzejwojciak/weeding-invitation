"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Gift, Wine, QrCode } from "lucide-react";
import { weddingConfig, getCoupleNames } from "@/lib/config/wedding";
import { getTranslation, type Language } from "@/lib/i18n/locales";

interface BoardingPassProps {
  recipientName: string;
  language: Language;
}

export default function BoardingPass({
  recipientName,
  language,
}: BoardingPassProps) {
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        {/* Boarding Pass Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-light tracking-widest">
                {t.boardingPass.header}
              </div>
              <div className="text-sm font-mono">
                {t.boardingPass.flightNumber}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-center my-4">
              {getCoupleNames("full")}
            </h1>
            <div className="text-center text-sm tracking-wide opacity-90">
              {weddingConfig.date.full}
            </div>
          </div>

          <div className="grid md:grid-cols-[2fr,1px,1fr] gap-0">
            {/* Main Section */}
            <div className="p-8">
              {/* Passenger */}
              <div className="mb-8">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {t.boardingPass.passengerName}
                </div>
                <div className="text-2xl font-semibold text-navy-900">
                  {recipientName}
                </div>
              </div>

              {/* Flight Details */}
              <div className="space-y-6 mb-8">
                {/* Departure - Ceremony */}
                <div className="border-l-4 border-navy-600 pl-4">
                  <div className="flex items-start gap-3">
                    <Clock
                      className="text-navy-600 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {t.boardingPass.departure} - {t.boardingPass.ceremony}
                      </div>
                      <div className="text-xl font-bold text-navy-900">
                        {weddingConfig.ceremony.time}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-1">
                        {weddingConfig.ceremony.locationName}
                      </div>
                      <div className="text-sm text-gray-600 flex items-start gap-1 mt-1">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        {weddingConfig.ceremony.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrival - Reception */}
                <div className="border-l-4 border-burgundy-600 pl-4">
                  <div className="flex items-start gap-3">
                    <Wine
                      className="text-burgundy-600 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {t.boardingPass.arrival} - {t.boardingPass.reception}
                      </div>
                      <div className="text-xl font-bold text-navy-900">
                        {t.boardingPass.followingCeremony}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mt-1">
                        {weddingConfig.reception.locationName}
                      </div>
                      <div className="text-sm text-gray-600 flex items-start gap-1 mt-1">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        {weddingConfig.reception.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Section */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="text-xs text-amber-900 uppercase tracking-wide mb-2 font-semibold">
                  ⚠ {t.boardingPass.importantInfo} - {t.boardingPass.rsvp}
                </div>
                <div className="text-sm text-gray-700">
                  {t.boardingPass.rsvpDescription}{" "}
                  <span className="font-semibold text-navy-900">
                    {weddingConfig.rsvp.deadline}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-navy-600" />
                    <span className="text-gray-600">
                      {weddingConfig.couple.bride.firstName}:
                    </span>
                    <a
                      href={`tel:${weddingConfig.couple.bride.phone}`}
                      className="font-medium text-navy-900 hover:underline"
                    >
                      {weddingConfig.couple.bride.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-navy-600" />
                    <span className="text-gray-600">
                      {weddingConfig.couple.groom.firstName}:
                    </span>
                    <a
                      href={`tel:${weddingConfig.couple.groom.phone}`}
                      className="font-medium text-navy-900 hover:underline"
                    >
                      {weddingConfig.couple.groom.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Gift Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Gift size={18} className="text-navy-600" />
                  <span>Monetary Gift Appreciated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wine size={18} className="text-burgundy-600" />
                  <span>Wine & Spirits Welcome</span>
                </div>
              </div>
            </div>

            {/* Divider (Perforated Line) */}
            <div className="hidden md:block relative bg-gray-200">
              <div className="absolute inset-0 flex flex-col justify-around py-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-full h-2 bg-white" />
                ))}
              </div>
            </div>

            {/* Sidebar - QR & Barcode */}
            <div className="bg-gray-50 p-8 flex flex-col items-center justify-center gap-6 border-t md:border-t-0 md:border-l border-gray-200">
              {/* QR Code Placeholder */}
              <div className="text-center">
                <div className="w-40 h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                  <QrCode size={80} className="text-gray-400" />
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  Scan to join
                </div>
                <div className="text-xs text-gray-600">WhatsApp Group</div>
              </div>

              {/* Barcode */}
              <div className="w-full">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <svg
                    width="100%"
                    height="60"
                    viewBox="0 0 200 60"
                    className="barcode"
                  >
                    {Array.from({ length: 40 }).map((_, i) => (
                      <rect
                        key={i}
                        x={i * 5}
                        y="0"
                        width={i % 3 === 0 ? 3 : 1}
                        height="60"
                        fill="#1e293b"
                      />
                    ))}
                  </svg>
                  <div className="text-center text-xs text-gray-600 mt-2 font-mono">
                    WED130626-{recipientName.substring(0, 3).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Seat/Gate Info */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="text-xs text-gray-500">
                    {t.boardingPass.gate}
                  </div>
                  <div className="text-lg font-bold text-navy-900">❤</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="text-xs text-gray-500">
                    {t.boardingPass.seat}
                  </div>
                  <div className="text-lg font-bold text-navy-900">VIP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-4 text-center text-white text-xs">
            <p className="opacity-80">
              We can&apos;t wait to celebrate this special day with you! •
              Please arrive 15 minutes early
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
