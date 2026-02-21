"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import BoardingPass from "@/components/BoardingPass";
import type { Invitation } from "@/lib/types/invitation";
import type { TranslationKeys } from "@/lib/i18n/locales";

interface InvitationClientProps {
  invitation: Invitation;
  translations: TranslationKeys;
}

export default function InvitationClient({
  invitation,
  translations,
}: InvitationClientProps) {
  const [showEnvelope, setShowEnvelope] = useState(!invitation.isRead);
  const [showBoardingPass, setShowBoardingPass] = useState(invitation.isRead);

  const handleEnvelopeOpen = async () => {
    // Start opening animation
    setShowEnvelope(false);

    // Mark as read in background
    try {
      await fetch(`/api/invitations/${invitation.slug}`, {
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

  return (
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
            translations={translations}
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
            translations={translations}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
