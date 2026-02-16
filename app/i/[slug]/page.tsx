"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Envelope from "@/components/Envelope";
import BoardingPass from "@/components/BoardingPass";
import type { Invitation } from "@/lib/types/invitation";

export default function InvitationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false);

  const fetchInvitation = useCallback(async () => {
    try {
      const response = await fetch(`/api/invitations/${slug}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Invitation not found");
        } else {
          setError("Failed to load invitation");
        }
        setLoading(false);
        return;
      }

      const data: Invitation = await response.json();
      setInvitation(data);

      // Determine which view to show
      if (data.isRead) {
        // Already read - show boarding pass directly
        setShowBoardingPass(true);
      } else {
        // First time - show envelope
        setShowEnvelope(true);
      }

      setLoading(false);
    } catch {
      setError("Failed to load invitation");
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInvitation();
  }, [fetchInvitation]);

  const handleEnvelopeOpen = async () => {
    // Start opening animation
    setShowEnvelope(false);

    // Mark as read in background
    try {
      await fetch(`/api/invitations/${slug}`, {
        method: "PATCH",
      });
    } catch {
      console.error("Failed to mark as read");
    }

    // Show boarding pass after a brief delay
    setTimeout(() => {
      setShowBoardingPass(true);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p>Loading your invitation...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center"
        >
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Oops!</h1>
          <p className="text-gray-600">
            {error ||
              "Something went wrong. Please check your invitation link."}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showEnvelope && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Envelope
              onOpen={handleEnvelopeOpen}
              recipientName={invitation.recipientName}
              language={invitation.language}
            />
          </motion.div>
        )}

        {showBoardingPass && (
          <motion.div
            key="boarding-pass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <BoardingPass
              recipientName={invitation.recipientName}
              language={invitation.language}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
