"use client";

import { useState, useEffect } from "react";
import { Save, Upload, X, MapPin } from "lucide-react";
import type { EditableWeddingConfig } from "@/lib/types/wedding-config";

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

  useEffect(() => {
    fetchConfig();
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

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !config) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setConfig({ ...config, telegramQrCode: base64 });
    };
    reader.readAsDataURL(file);
  };

  const removeQrCode = () => {
    if (!config) return;
    const { telegramQrCode, ...rest } = config;
    setConfig(rest);
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
            ? "p-6 space-y-6"
            : "p-6 space-y-6 max-h-[70vh] overflow-y-auto"
        }
      >
        {/* Couple Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bride */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-navy-900">
              Bride Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={config.couple.bride.firstName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      bride: {
                        ...config.couple.bride,
                        firstName: e.target.value,
                        fullName: `${e.target.value} ${config.couple.bride.lastName}`,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={config.couple.bride.lastName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      bride: {
                        ...config.couple.bride,
                        lastName: e.target.value,
                        fullName: `${config.couple.bride.firstName} ${e.target.value}`,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={config.couple.bride.phone}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      bride: {
                        ...config.couple.bride,
                        phone: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Groom */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-navy-900">
              Groom Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={config.couple.groom.firstName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      groom: {
                        ...config.couple.groom,
                        firstName: e.target.value,
                        fullName: `${e.target.value} ${config.couple.groom.lastName}`,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={config.couple.groom.lastName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      groom: {
                        ...config.couple.groom,
                        lastName: e.target.value,
                        fullName: `${config.couple.groom.firstName} ${e.target.value}`,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={config.couple.groom.phone}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: {
                      ...config.couple,
                      groom: {
                        ...config.couple.groom,
                        phone: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Ceremony */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Ceremony Location
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <input
              type="text"
              value={config.ceremony.locationName}
              onChange={(e) =>
                setConfig({
                  ...config,
                  ceremony: {
                    ...config.ceremony,
                    locationName: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={config.ceremony.address}
              onChange={(e) =>
                setConfig({
                  ...config,
                  ceremony: { ...config.ceremony, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps URL
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
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
        </div>

        {/* Reception */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Reception Location
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <input
              type="text"
              value={config.reception.locationName}
              onChange={(e) =>
                setConfig({
                  ...config,
                  reception: {
                    ...config.reception,
                    locationName: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={config.reception.address}
              onChange={(e) =>
                setConfig({
                  ...config,
                  reception: {
                    ...config.reception,
                    address: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps URL
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
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
        </div>

        {/* Telegram QR Code */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg text-navy-900">
            Telegram Group QR Code
          </h3>
          {config.telegramQrCode ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={config.telegramQrCode}
                  alt="Telegram QR Code"
                  className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg"
                />
                <button
                  onClick={removeQrCode}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer">
                  <Upload size={16} />
                  Replace QR Code
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQrCodeUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg transition-colors cursor-pointer">
                <Upload size={16} />
                Upload QR Code
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrCodeUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload a QR code image for guests to join the Telegram group
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
        className={`flex items-center gap-3 p-6 border-t bg-gray-50 ${isEmbedded ? "justify-end" : "justify-end"}`}
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
