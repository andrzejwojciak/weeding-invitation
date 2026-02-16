"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import WeddingConfigEditor from "@/components/WeddingConfigEditor";

export default function ConfigPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const verifyAuth = async (key: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey: key }),
      });

      if (response.ok) {
        setAuthenticated(true);
      } else {
        router.push("/admin");
      }
    } catch {
      router.push("/admin");
    }
  };

  useEffect(() => {
    // Check if user has admin secret in localStorage
    const stored = localStorage.getItem("adminSecretKey");
    if (stored) {
      setSecretKey(stored);
      verifyAuth(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        localStorage.setItem("adminSecretKey", secretKey);
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Connection error");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">
            Wedding Configuration
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter admin secret key"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-navy-600 text-white py-2 px-4 rounded-lg hover:bg-navy-700 transition-colors font-medium"
            >
              Access Configuration
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span>Back to Admin Panel</span>
            </button>
            <h1 className="text-2xl font-bold text-navy-900">
              Wedding Configuration
            </h1>
          </div>
          <WeddingConfigEditor secretKey={secretKey} isEmbedded={true} />
        </div>
      </div>
    </div>
  );
}
