"use client";

import { useState, useEffect } from "react";
import { Save, Upload, X, MapPin } from "lucide-react";
import type { EditableWeddingConfig } from "@/lib/types/wedding-config";
import type { Language } from "@/lib/i18n/locales";

interface WeddingConfigEditorProps {
  secretKey: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export default function WeddingConfigEditor({
  secretKey,
  onClose,
  isEmbedded = false,
}: WeddingConfigEditorProps) {
  const [config, setConfig] = useState<EditableWeddingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>("en");

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/wedding-config", {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Migrate old config to new structure
        if (!data.couple) {
          data.couple = {
            bride: {
              en: {
                firstName: "Hermione",
                lastName: "Granger",
                fullName: "Hermione Granger",
                phone: "+1 555 123 4567",
              },
              pl: {
                firstName: "Hermiona",
                lastName: "Granger",
                fullName: "Hermiona Granger",
                phone: "+48 555 123 456",
              },
              uk: {
                firstName: "Герміона",
                lastName: "Ґрейнджер",
                fullName: "Герміона Ґрейнджер",
                phone: "+380 55 123 4567",
              },
            },
            groom: {
              en: {
                firstName: "Shrek",
                lastName: "Ogre",
                fullName: "Shrek Ogre",
                phone: "+1 555 765 4321",
              },
              pl: {
                firstName: "Shrek",
                lastName: "Ogr",
                fullName: "Shrek Ogr",
                phone: "+48 555 765 432",
              },
              uk: {
                firstName: "Шрек",
                lastName: "Огр",
                fullName: "Шрек Огр",
                phone: "+380 55 765 4321",
              },
            },
          };
        } else if (
          data.couple.bride &&
          (typeof data.couple.bride.firstName === "string" ||
            typeof data.couple.bride.phone === "string")
        ) {
          // Migrate old couple structure to localized (both very old and previous version)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const oldCouple = data.couple as any;
          const bridePhone = oldCouple.bride.phone || "+1 555 123 4567";
          const groomPhone = oldCouple.groom.phone || "+1 555 765 4321";

          data.couple = {
            bride: {
              en: {
                firstName:
                  oldCouple.bride.en?.firstName ||
                  oldCouple.bride.firstName ||
                  "",
                lastName:
                  oldCouple.bride.en?.lastName ||
                  oldCouple.bride.lastName ||
                  "",
                fullName:
                  oldCouple.bride.en?.fullName ||
                  oldCouple.bride.fullName ||
                  "",
                phone: oldCouple.bride.en?.phone || bridePhone,
              },
              pl: {
                firstName:
                  oldCouple.bride.pl?.firstName ||
                  oldCouple.bride.firstName ||
                  "",
                lastName:
                  oldCouple.bride.pl?.lastName ||
                  oldCouple.bride.lastName ||
                  "",
                fullName:
                  oldCouple.bride.pl?.fullName ||
                  oldCouple.bride.fullName ||
                  "",
                phone: oldCouple.bride.pl?.phone || bridePhone,
              },
              uk: {
                firstName:
                  oldCouple.bride.uk?.firstName ||
                  oldCouple.bride.firstName ||
                  "",
                lastName:
                  oldCouple.bride.uk?.lastName ||
                  oldCouple.bride.lastName ||
                  "",
                fullName:
                  oldCouple.bride.uk?.fullName ||
                  oldCouple.bride.fullName ||
                  "",
                phone: oldCouple.bride.uk?.phone || bridePhone,
              },
            },
            groom: {
              en: {
                firstName:
                  oldCouple.groom.en?.firstName ||
                  oldCouple.groom.firstName ||
                  "",
                lastName:
                  oldCouple.groom.en?.lastName ||
                  oldCouple.groom.lastName ||
                  "",
                fullName:
                  oldCouple.groom.en?.fullName ||
                  oldCouple.groom.fullName ||
                  "",
                phone: oldCouple.groom.en?.phone || groomPhone,
              },
              pl: {
                firstName:
                  oldCouple.groom.pl?.firstName ||
                  oldCouple.groom.firstName ||
                  "",
                lastName:
                  oldCouple.groom.pl?.lastName ||
                  oldCouple.groom.lastName ||
                  "",
                fullName:
                  oldCouple.groom.pl?.fullName ||
                  oldCouple.groom.fullName ||
                  "",
                phone: oldCouple.groom.pl?.phone || groomPhone,
              },
              uk: {
                firstName:
                  oldCouple.groom.uk?.firstName ||
                  oldCouple.groom.firstName ||
                  "",
                lastName:
                  oldCouple.groom.uk?.lastName ||
                  oldCouple.groom.lastName ||
                  "",
                fullName:
                  oldCouple.groom.uk?.fullName ||
                  oldCouple.groom.fullName ||
                  "",
                phone: oldCouple.groom.uk?.phone || groomPhone,
              },
            },
          };
        }

        if (!data.date) {
          data.date = {
            year: 2026,
            month: 12,
            day: 25,
          };
        }

        // Migrate ceremony if it has old structure (locationName/address as strings)
        if (data.ceremony && typeof data.ceremony.locationName === "string") {
          const oldCeremony = data.ceremony;
          data.ceremony = {
            time: oldCeremony.time || "15:00",
            googleMapsUrl: oldCeremony.googleMapsUrl || "",
            en: {
              locationName: oldCeremony.locationName || "",
              address: oldCeremony.address || "",
            },
            pl: {
              locationName: oldCeremony.locationName || "",
              address: oldCeremony.address || "",
            },
            uk: {
              locationName: oldCeremony.locationName || "",
              address: oldCeremony.address || "",
            },
          };
        }

        // Migrate reception if it has old structure
        if (data.reception && typeof data.reception.locationName === "string") {
          const oldReception = data.reception;
          data.reception = {
            googleMapsUrl: oldReception.googleMapsUrl || "",
            en: {
              locationName: oldReception.locationName || "",
              address: oldReception.address || "",
            },
            pl: {
              locationName: oldReception.locationName || "",
              address: oldReception.address || "",
            },
            uk: {
              locationName: oldReception.locationName || "",
              address: oldReception.address || "",
            },
          };
        }

        // Migrate old telegramQrCode (string) to new structure (object)
        if (data.telegramQrCode && typeof data.telegramQrCode === "string") {
          const oldQrCode = data.telegramQrCode;
          data.groupQrCode = {
            en: oldQrCode,
            pl: oldQrCode,
            uk: oldQrCode,
          };
          delete data.telegramQrCode;
        } else if (
          data.telegramQrCode &&
          typeof data.telegramQrCode === "object"
        ) {
          // Rename telegramQrCode to groupQrCode
          data.groupQrCode = data.telegramQrCode;
          delete data.telegramQrCode;
        }

        setConfig(data);
      } else {
        setError("Failed to load configuration");
      }
    } catch {
      setError("Failed to load configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/wedding-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save configuration");
      }
    } catch {
      setError("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleQrCodeUpload =
    (lang: Language) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !config) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setConfig({
          ...config,
          groupQrCode: {
            ...config.groupQrCode,
            [lang]: base64,
          },
        });
      };
      reader.readAsDataURL(file);
    };

  const removeQrCode = (lang: Language) => () => {
    if (!config) return;
    setConfig({
      ...config,
      groupQrCode: {
        ...config.groupQrCode,
        [lang]: undefined,
      },
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="w-12 h-12 border-4 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  const content = (
    <>
      {/* Content */}
      <div
        className={
          isEmbedded
            ? "space-y-6"
            : "p-6 space-y-6 max-h-[70vh] overflow-y-auto"
        }
      >
        {/* Couple Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-navy-900">Couple Details</h2>

          {/* Base Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Base Information (Required)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bride Base */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Bride</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={config.couple.bride.base?.firstName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          bride: {
                            ...config.couple.bride,
                            base: {
                              ...config.couple.bride.base,
                              firstName: e.target.value,
                              fullName: `${e.target.value} ${config.couple.bride.base?.lastName || ""}`,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={config.couple.bride.base?.lastName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          bride: {
                            ...config.couple.bride,
                            base: {
                              ...config.couple.bride.base,
                              lastName: e.target.value,
                              fullName: `${config.couple.bride.base?.firstName || ""} ${e.target.value}`,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={config.couple.bride.base?.phone || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          bride: {
                            ...config.couple.bride,
                            base: {
                              ...config.couple.bride.base,
                              phone: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Groom Base */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Groom</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={config.couple.groom.base?.firstName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          groom: {
                            ...config.couple.groom,
                            base: {
                              ...config.couple.groom.base,
                              firstName: e.target.value,
                              fullName: `${e.target.value} ${config.couple.groom.base?.lastName || ""}`,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={config.couple.groom.base?.lastName || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          groom: {
                            ...config.couple.groom,
                            base: {
                              ...config.couple.groom.base,
                              lastName: e.target.value,
                              fullName: `${config.couple.groom.base?.firstName || ""} ${e.target.value}`,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={config.couple.groom.base?.phone || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          groom: {
                            ...config.couple.groom,
                            base: {
                              ...config.couple.groom.base,
                              phone: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Language-Specific Overrides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Language-Specific Overrides (Optional)
            </h3>
            <p className="text-sm text-gray-600">
              Only fill in fields that differ from the base information for each
              language.
            </p>

            {/* Language Tabs */}
            <div className="flex gap-2 border-b">
              {(["en", "pl", "uk"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    selectedLang === lang
                      ? "border-b-2 border-navy-600 text-navy-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {lang === "en" && "🇬🇧 English"}
                  {lang === "pl" && "🇵🇱 Polski"}
                  {lang === "uk" && "🇺🇦 Українська"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bride */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-navy-900">
                Bride Overrides ({selectedLang.toUpperCase()})
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name (leave empty to use base)
                </label>
                <input
                  type="text"
                  value={config.couple.bride[selectedLang]?.firstName || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: {
                          ...config.couple.bride,
                          [selectedLang]: {
                            ...config.couple.bride[selectedLang],
                            firstName: e.target.value,
                            fullName: e.target.value
                              ? `${e.target.value} ${config.couple.bride[selectedLang]?.lastName || config.couple.bride.base?.lastName || ""}`
                              : undefined,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.bride.base?.firstName || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name (leave empty to use base)
                </label>
                <input
                  type="text"
                  value={config.couple.bride[selectedLang]?.lastName || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: {
                          ...config.couple.bride,
                          [selectedLang]: {
                            ...config.couple.bride[selectedLang],
                            lastName: e.target.value,
                            fullName: e.target.value
                              ? `${config.couple.bride[selectedLang]?.firstName || config.couple.bride.base?.firstName || ""} ${e.target.value}`
                              : undefined,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.bride.base?.lastName || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (leave empty to use base)
                </label>
                <input
                  type="tel"
                  value={config.couple.bride[selectedLang]?.phone || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: {
                          ...config.couple.bride,
                          [selectedLang]: {
                            ...config.couple.bride[selectedLang],
                            phone: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.bride.base?.phone || ""}
                />
              </div>
            </div>

            {/* Groom */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-navy-900">
                Groom Overrides ({selectedLang.toUpperCase()})
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name (leave empty to use base)
                </label>
                <input
                  type="text"
                  value={config.couple.groom[selectedLang]?.firstName || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: {
                          ...config.couple.groom,
                          [selectedLang]: {
                            ...config.couple.groom[selectedLang],
                            firstName: e.target.value,
                            fullName: e.target.value
                              ? `${e.target.value} ${config.couple.groom[selectedLang]?.lastName || config.couple.groom.base?.lastName || ""}`
                              : undefined,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.groom.base?.firstName || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name (leave empty to use base)
                </label>
                <input
                  type="text"
                  value={config.couple.groom[selectedLang]?.lastName || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: {
                          ...config.couple.groom,
                          [selectedLang]: {
                            ...config.couple.groom[selectedLang],
                            lastName: e.target.value,
                            fullName: e.target.value
                              ? `${config.couple.groom[selectedLang]?.firstName || config.couple.groom.base?.firstName || ""} ${e.target.value}`
                              : undefined,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.groom.base?.lastName || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (leave empty to use base)
                </label>
                <input
                  type="tel"
                  value={config.couple.groom[selectedLang]?.phone || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: {
                          ...config.couple.groom,
                          [selectedLang]: {
                            ...config.couple.groom[selectedLang],
                            phone: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder={config.couple.groom.base?.phone || ""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Date */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">Wedding Date</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <select
                value={config.date.day}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    date: { ...config.date, day: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={config.date.month}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    date: { ...config.date, month: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={config.date.year}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    date: { ...config.date, year: parseInt(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              >
                {Array.from({ length: 10 }, (_, i) => 2026 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ceremony */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Ceremony Location
          </h3>

          {/* Base Ceremony Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-blue-900">Base Information</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time (same for all languages)
              </label>
              <input
                type="text"
                value={config.ceremony.time}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    ceremony: { ...config.ceremony, time: e.target.value },
                  })
                }
                placeholder="14:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps URL (same for all languages)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={config.ceremony.googleMapsUrl}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      ceremony: {
                        ...config.ceremony,
                        googleMapsUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://maps.google.com/?q=..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <a
                  href={config.ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MapPin size={16} />
                  Test
                </a>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name
              </label>
              <input
                type="text"
                value={config.ceremony.base?.locationName || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    ceremony: {
                      ...config.ceremony,
                      base: {
                        ...config.ceremony.base,
                        locationName: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={config.ceremony.base?.address || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    ceremony: {
                      ...config.ceremony,
                      base: {
                        ...config.ceremony.base,
                        address: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Language Overrides */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">
              Language-Specific Overrides
            </h4>
            <p className="text-sm text-gray-600">
              Only fill in fields that differ from the base information.
            </p>
          </div>

          {/* Language Tabs */}
          <div className="flex gap-2 border-b">
            {(["en", "pl", "uk"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedLang === lang
                    ? "border-b-2 border-navy-600 text-navy-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {lang === "en" && "🇬🇧 English"}
                {lang === "pl" && "🇵🇱 Polski"}
                {lang === "uk" && "🇺🇦 Українська"}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name ({selectedLang.toUpperCase()}) - leave empty to use
              base
            </label>
            <input
              type="text"
              value={config.ceremony[selectedLang]?.locationName || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  ceremony: {
                    ...config.ceremony,
                    [selectedLang]: {
                      ...config.ceremony[selectedLang],
                      locationName: e.target.value,
                    },
                  },
                })
              }
              placeholder={config.ceremony.base?.locationName || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address ({selectedLang.toUpperCase()}) - leave empty to use base
            </label>
            <input
              type="text"
              value={config.ceremony[selectedLang]?.address || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  ceremony: {
                    ...config.ceremony,
                    [selectedLang]: {
                      ...config.ceremony[selectedLang],
                      address: e.target.value,
                    },
                  },
                })
              }
              placeholder={config.ceremony.base?.address || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Reception */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Reception Location
          </h3>

          {/* Base Reception Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-blue-900">Base Information</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps URL (same for all languages)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={config.reception.googleMapsUrl}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      reception: {
                        ...config.reception,
                        googleMapsUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://maps.google.com/?q=..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <a
                  href={config.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MapPin size={16} />
                  Test
                </a>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name
              </label>
              <input
                type="text"
                value={config.reception.base?.locationName || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reception: {
                      ...config.reception,
                      base: {
                        ...config.reception.base,
                        locationName: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={config.reception.base?.address || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reception: {
                      ...config.reception,
                      base: {
                        ...config.reception.base,
                        address: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Language Overrides */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">
              Language-Specific Overrides
            </h4>
            <p className="text-sm text-gray-600">
              Only fill in fields that differ from the base information.
            </p>
          </div>

          {/* Same language tabs */}
          <div className="flex gap-2 border-b">
            {(["en", "pl", "uk"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedLang === lang
                    ? "border-b-2 border-navy-600 text-navy-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {lang === "en" && "🇬🇧 English"}
                {lang === "pl" && "🇵🇱 Polski"}
                {lang === "uk" && "🇺🇦 Українська"}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name ({selectedLang.toUpperCase()}) - leave empty to use
              base
            </label>
            <input
              type="text"
              value={config.reception[selectedLang]?.locationName || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  reception: {
                    ...config.reception,
                    [selectedLang]: {
                      ...config.reception[selectedLang],
                      locationName: e.target.value,
                    },
                  },
                })
              }
              placeholder={config.reception.base?.locationName || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address ({selectedLang.toUpperCase()}) - leave empty to use base
            </label>
            <input
              type="text"
              value={config.reception[selectedLang]?.address || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  reception: {
                    ...config.reception,
                    [selectedLang]: {
                      ...config.reception[selectedLang],
                      address: e.target.value,
                    },
                  },
                })
              }
              placeholder={config.reception.base?.address || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Dress Code */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Dress Code (Optional)
          </h3>
          <p className="text-sm text-gray-600">
            Request for specific colors - leave empty to hide this section
          </p>

          {/* Base Dress Code */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-blue-900">Base Text</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dress Code Request
              </label>
              <textarea
                value={config.dressCode?.base || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    dressCode: config.dressCode
                      ? { ...config.dressCode, base: e.target.value }
                      : { base: e.target.value },
                  })
                }
                placeholder="e.g., We kindly request colors: navy blue, burgundy, and cream"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Language Overrides */}
          {config.dressCode?.base && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Language-Specific Overrides
              </h4>
              <div className="flex gap-2 border-b">
                {(["en", "pl", "uk"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      selectedLang === lang
                        ? "border-b-2 border-navy-600 text-navy-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {lang === "en" && "🇬🇧 English"}
                    {lang === "pl" && "🇵🇱 Polski"}
                    {lang === "uk" && "🇺🇦 Українська"}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dress Code ({selectedLang.toUpperCase()}) - leave empty to use
                  base
                </label>
                <textarea
                  value={config.dressCode?.[selectedLang] || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dressCode: {
                        ...config.dressCode!,
                        [selectedLang]: e.target.value,
                      },
                    })
                  }
                  placeholder={config.dressCode?.base || ""}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Background Image Upload */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Background Image
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boarding Pass Background
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setConfig({
                            ...config,
                            backgroundImage: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image to use as boarding pass background
                    (recommended: 1200x1600px)
                  </p>
                </div>
                {config.backgroundImage && (
                  <div className="flex flex-col gap-2">
                    <img
                      src={config.backgroundImage}
                      alt="Background preview"
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      onClick={() =>
                        setConfig({
                          ...config,
                          backgroundImage: undefined,
                          backgroundPosition: undefined,
                        })
                      }
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            {config.backgroundImage && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Position
                </label>
                <select
                  value={config.backgroundPosition || "main-section"}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      backgroundPosition: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="main-section">
                    Main section (left side with info)
                  </option>
                  <option value="full">
                    Entire screen (full page background)
                  </option>
                  <option value="header">
                    Header area (couple names section)
                  </option>
                  <option value="between-header">
                    Between header and info (under couple names)
                  </option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose where the background image should appear
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Group QR Code */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Chat Group QR Codes
          </h3>

          {/* Language Tabs */}
          <div className="flex gap-2 border-b">
            {(["en", "pl", "uk"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 font-medium transition-colors ${
                  selectedLang === lang
                    ? "border-b-2 border-navy-600 text-navy-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {lang === "en" && "🇬🇧 English"}
                {lang === "pl" && "🇵🇱 Polski"}
                {lang === "uk" && "🇺🇦 Українська"}
              </button>
            ))}
          </div>

          {config.groupQrCode?.[selectedLang] ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={config.groupQrCode[selectedLang]}
                  alt={`Chat Group QR Code (${selectedLang.toUpperCase()})`}
                  className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg"
                />
                <button
                  onClick={removeQrCode(selectedLang)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer">
                  <Upload size={16} />
                  Replace QR Code ({selectedLang.toUpperCase()})
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQrCodeUpload(selectedLang)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg transition-colors cursor-pointer">
                <Upload size={16} />
                Upload QR Code ({selectedLang.toUpperCase()})
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrCodeUpload(selectedLang)}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload a QR code image for {selectedLang.toUpperCase()} guests
                to join the chat group (WhatsApp, Telegram, etc.)
              </p>
            </div>
          )}
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
            Configuration saved successfully!
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={`flex items-center gap-3 border-t ${
          isEmbedded ? "pt-6 justify-end" : "p-6 bg-gray-50 justify-end"
        }`}
      >
        {!isEmbedded && onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-navy-900">
            Edit Wedding Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}
