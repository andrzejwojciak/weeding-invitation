"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Plus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import type { Invitation } from "@/lib/types/invitation";
import { languages, type Language } from "@/lib/i18n/locales";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newRecipientName, setNewRecipientName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (authenticated) {
      fetchInvitations();
    }
  }, [authenticated]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      });

      if (response.ok) {
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Authentication failed");
    }
  };

  const fetchInvitations = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/invitations", {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInvitations(data);
      }
    } catch {
      setError("Failed to fetch invitations");
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipientName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          recipientName: newRecipientName,
          language: selectedLanguage,
        }),
      });

      if (response.ok) {
        setNewRecipientName("");
        setSelectedLanguage("en");
        await fetchInvitations();
      } else {
        setError("Failed to create invitation");
      }
    } catch {
      setError("Failed to create invitation");
    } finally {
      setLoading(false);
    }
  };

  const copyInvitationLink = (slug: string) => {
    const url = `${window.location.origin}/i/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleDeleteInvitation = async (
    slug: string,
    recipientName: string,
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete the invitation for ${recipientName}?`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/invitations/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (response.ok) {
        await fetchInvitations();
      } else {
        setError("Failed to delete invitation");
      }
    } catch {
      setError("Failed to delete invitation");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-navy-900 mb-6 text-center">
            Admin Panel
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label
                htmlFor="secretKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Secret Key
              </label>
              <input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter admin secret key"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-navy-600 text-white py-2 px-4 rounded-lg hover:bg-navy-700 transition-colors font-medium"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-navy-900">
              Wedding Invitations Admin
            </h1>
            <button
              onClick={fetchInvitations}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh invitations"
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          <form onSubmit={handleCreateInvitation} className="mb-8">
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                value={newRecipientName}
                onChange={(e) => setNewRecipientName(e.target.value)}
                placeholder="Enter guest full name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                required
              />
              <select
                value={selectedLanguage}
                onChange={(e) =>
                  setSelectedLanguage(e.target.value as Language)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white min-w-[180px]"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={loading}
                className="bg-navy-600 text-white px-6 py-2 rounded-lg hover:bg-navy-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                <Plus size={20} />
                Create Invitation
              </button>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Guest Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Language
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invitations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No invitations yet. Create your first one above.
                    </td>
                  </tr>
                ) : (
                  invitations.map((invitation) => (
                    <tr
                      key={invitation.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium">
                        {invitation.recipientName}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">
                          {
                            languages.find(
                              (l) => l.code === invitation.language,
                            )?.flag
                          }{" "}
                          {languages.find((l) => l.code === invitation.language)
                            ?.name || invitation.language}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            invitation.isRead
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {invitation.isRead ? (
                            <>
                              <CheckCircle size={14} />
                              Opened
                            </>
                          ) : (
                            <>
                              <XCircle size={14} />
                              Not Opened
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(invitation.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => copyInvitationLink(invitation.slug)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors text-sm font-medium"
                          >
                            <Copy size={16} />
                            {copiedSlug === invitation.slug
                              ? "Copied!"
                              : "Copy Link"}
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteInvitation(
                                invitation.slug,
                                invitation.recipientName,
                              )
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            title="Delete invitation"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
