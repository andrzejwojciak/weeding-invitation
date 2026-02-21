"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Gift,
  Wine,
  QrCode,
  ExternalLink,
} from "lucide-react";
import { weddingConfig } from "@/lib/config/wedding";
import {
  formatDate,
  type Language,
  type TranslationKeys,
} from "@/lib/i18n/locales";
import type { EditableWeddingConfig } from "@/lib/types/wedding-config";

interface BoardingPassProps {
  recipientName: string;
  language: Language;
  translations: TranslationKeys;
}

export default function BoardingPass({
  recipientName,
  language,
  translations,
}: BoardingPassProps) {
  const t = translations;
  const [config, setConfig] = useState<EditableWeddingConfig | null>(null);

  useEffect(() => {
    fetch("/api/wedding-config/public")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => console.error("Failed to load config"));
  }, []);

  // Use custom config or fallback to default
  const ceremonyConfig = config?.ceremony;
  const receptionConfig = config?.reception;
  const coupleConfig = config?.couple;
  const dateData = config?.date || weddingConfig.date;
  const qrCode = config?.groupQrCode?.[language];
  const backgroundImage = config?.backgroundImage;
  const backgroundPosition = config?.backgroundPosition || "main-section";

  // Get localized couple data with fallback
  const coupleData = coupleConfig
    ? {
        bride: {
          firstName:
            coupleConfig.bride[language]?.firstName?.trim() ||
            coupleConfig.bride.pl?.firstName?.trim() ||
            coupleConfig.bride.uk?.firstName?.trim() ||
            coupleConfig.bride.en?.firstName?.trim() ||
            coupleConfig.bride.base.firstName,
          fullName:
            coupleConfig.bride[language]?.fullName?.trim() ||
            coupleConfig.bride.pl?.fullName?.trim() ||
            coupleConfig.bride.uk?.fullName?.trim() ||
            coupleConfig.bride.en?.fullName?.trim() ||
            coupleConfig.bride.base.fullName,
          phone:
            coupleConfig.bride[language]?.phone?.trim() ||
            coupleConfig.bride.pl?.phone?.trim() ||
            coupleConfig.bride.uk?.phone?.trim() ||
            coupleConfig.bride.en?.phone?.trim() ||
            coupleConfig.bride.base.phone,
        },
        groom: {
          firstName:
            coupleConfig.groom[language]?.firstName?.trim() ||
            coupleConfig.groom.pl?.firstName?.trim() ||
            coupleConfig.groom.uk?.firstName?.trim() ||
            coupleConfig.groom.en?.firstName?.trim() ||
            coupleConfig.groom.base.firstName,
          fullName:
            coupleConfig.groom[language]?.fullName?.trim() ||
            coupleConfig.groom.pl?.fullName?.trim() ||
            coupleConfig.groom.uk?.fullName?.trim() ||
            coupleConfig.groom.en?.fullName?.trim() ||
            coupleConfig.groom.base.fullName,
          phone:
            coupleConfig.groom[language]?.phone?.trim() ||
            coupleConfig.groom.pl?.phone?.trim() ||
            coupleConfig.groom.uk?.phone?.trim() ||
            coupleConfig.groom.en?.phone?.trim() ||
            coupleConfig.groom.base.phone,
        },
      }
    : {
        bride: {
          firstName: weddingConfig.couple.bride.firstName,
          fullName: weddingConfig.couple.bride.fullName,
          phone: weddingConfig.couple.bride.phone,
        },
        groom: {
          firstName: weddingConfig.couple.groom.firstName,
          fullName: weddingConfig.couple.groom.fullName,
          phone: weddingConfig.couple.groom.phone,
        },
      };

  // Get localized ceremony and reception data with fallback
  const ceremonyData = ceremonyConfig
    ? {
        time: ceremonyConfig.time,
        googleMapsUrl: ceremonyConfig.googleMapsUrl,
        locationName:
          ceremonyConfig[language]?.locationName?.trim() ||
          ceremonyConfig.pl?.locationName?.trim() ||
          ceremonyConfig.uk?.locationName?.trim() ||
          ceremonyConfig.en?.locationName?.trim() ||
          ceremonyConfig.base.locationName,
        address:
          ceremonyConfig[language]?.address?.trim() ||
          ceremonyConfig.pl?.address?.trim() ||
          ceremonyConfig.uk?.address?.trim() ||
          ceremonyConfig.en?.address?.trim() ||
          ceremonyConfig.base.address,
      }
    : {
        time: weddingConfig.ceremony.time,
        googleMapsUrl: "",
        locationName: weddingConfig.ceremony.locationName,
        address: weddingConfig.ceremony.address,
      };

  const receptionData = receptionConfig
    ? {
        googleMapsUrl: receptionConfig.googleMapsUrl,
        locationName:
          receptionConfig[language]?.locationName?.trim() ||
          receptionConfig.pl?.locationName?.trim() ||
          receptionConfig.uk?.locationName?.trim() ||
          receptionConfig.en?.locationName?.trim() ||
          receptionConfig.base.locationName,
        address:
          receptionConfig[language]?.address?.trim() ||
          receptionConfig.pl?.address?.trim() ||
          receptionConfig.uk?.address?.trim() ||
          receptionConfig.en?.address?.trim() ||
          receptionConfig.base.address,
      }
    : {
        googleMapsUrl: "",
        locationName: weddingConfig.reception.locationName,
        address: weddingConfig.reception.address,
      };

  // Format couple names
  const coupleNames = `${coupleData.bride.fullName} & ${coupleData.groom.fullName}`;

  // Format date using i18n function
  const weddingDate = formatDate(
    dateData.year,
    dateData.month,
    dateData.day,
    language,
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4 py-12 relative"
      style={
        backgroundImage && backgroundPosition === "full"
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {backgroundImage && backgroundPosition === "full" && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Boarding Pass Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Header */}
          <div
            className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-6 text-white relative"
            style={
              backgroundImage && backgroundPosition === "header"
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {backgroundImage && backgroundPosition === "header" && (
              <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" />
            )}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-light tracking-widest">
                  {t.boardingPass.header}
                </div>
                <div className="text-sm font-mono">
                  {t.boardingPass.flightNumber}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-center my-4">
                {coupleNames}
              </h1>
              <div className="text-center text-sm tracking-wide opacity-90">
                {weddingDate}
              </div>
            </div>
          </div>

          {/* Area between header and content */}
          {backgroundImage && backgroundPosition === "between-header" && (
            <div
              className="relative h-96"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/75" />
            </div>
          )}

          <div className="grid md:grid-cols-[2fr,1px,1fr] gap-0 relative">
            {/* Main Section */}
            <div
              className="p-8 relative z-10"
              style={
                backgroundImage && backgroundPosition === "main-section"
                  ? {
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {backgroundImage && backgroundPosition === "main-section" && (
                <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
              )}
              <div className="relative z-10">
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
                          {ceremonyData.time}
                        </div>
                        <div className="text-sm font-medium text-gray-700 mt-1">
                          {ceremonyData.locationName}
                        </div>
                        <a
                          href={
                            "googleMapsUrl" in ceremonyData
                              ? ceremonyData.googleMapsUrl
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-navy-600 hover:text-navy-800 flex items-start gap-1 mt-1 hover:underline"
                        >
                          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                          {ceremonyData.address}
                          <ExternalLink size={12} className="mt-1" />
                        </a>
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
                          {receptionData.locationName}
                        </div>
                        <a
                          href={
                            "googleMapsUrl" in receptionData
                              ? receptionData.googleMapsUrl
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-navy-600 hover:text-navy-800 flex items-start gap-1 mt-1 hover:underline"
                        >
                          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                          {receptionData.address}
                          <ExternalLink size={12} className="mt-1" />
                        </a>
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
                      {t.dates.rsvpDeadline}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-navy-600" />
                      <span className="text-gray-600">
                        {coupleData.bride.firstName}:
                      </span>
                      <a
                        href={`tel:${coupleData.bride.phone}`}
                        className="font-medium text-navy-900 hover:underline"
                      >
                        {coupleData.bride.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-navy-600" />
                      <span className="text-gray-600">
                        {coupleData.groom.firstName}:
                      </span>
                      <a
                        href={`tel:${coupleData.groom.phone}`}
                        className="font-medium text-navy-900 hover:underline"
                      >
                        {coupleData.groom.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Gift Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-navy-600" />
                    <span>{t.boardingPass.monetaryGift}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wine size={18} className="text-burgundy-600" />
                    <span>{t.boardingPass.wineSpirits}</span>
                  </div>
                </div>

                {/* Dress Code */}
                {config?.dressCode?.base && (
                  <div className="mt-4 p-3 bg-cream-50 border border-cream-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {config.dressCode[language] || config.dressCode.base}
                    </p>
                  </div>
                )}
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
              {/* QR Code */}
              <div className="text-center">
                <div className="w-40 h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-3 shadow-sm overflow-hidden">
                  {qrCode ? (
                    <img
                      src={qrCode}
                      alt="Chat Group QR Code"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <QrCode size={80} className="text-gray-400" />
                  )}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {t.boardingPass.scanToJoin}
                </div>
                <div className="text-xs text-gray-600">
                  {t.boardingPass.chatGroup}
                </div>
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

            {/* Footer */}
            <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-4 text-center text-white text-xs">
              <p className="opacity-80">{t.boardingPass.footer}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
