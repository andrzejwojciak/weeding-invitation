"use client";

import { motion } from "framer-motion";
import { getCoupleInitials } from "@/lib/config/wedding";

interface EnvelopeProps {
  onOpen: () => void;
  recipientName: string;
}

export default function Envelope({ onOpen, recipientName }: EnvelopeProps) {
  const initials = getCoupleInitials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl text-white font-serif mb-2">
            Dear {recipientName}
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            You have received a special invitation
          </p>
        </motion.div>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative cursor-pointer focus:outline-none group"
        >
          {/* Envelope Body */}
          <div className="relative w-72 h-48 md:w-96 md:h-64">
            {/* Back flap */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200 rounded-lg shadow-2xl"
              style={{ transformOrigin: "top" }}
            />

            {/* Wax Seal */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Seal shadow */}
                <div className="absolute inset-0 bg-burgundy-900 blur-md opacity-50 rounded-full scale-110" />

                {/* Seal */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-burgundy-600 to-burgundy-800 rounded-full shadow-xl flex items-center justify-center">
                  {/* Seal pattern */}
                  <div className="absolute inset-2 border-2 border-burgundy-400 rounded-full opacity-40" />
                  <div className="text-cream-100 text-2xl md:text-3xl font-serif">
                    {initials}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Front flap */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cream-200 to-cream-300 rounded-t-lg"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />

            {/* Envelope lines decoration */}
            <div className="absolute bottom-8 left-8 right-8 space-y-2 opacity-20">
              <div className="h-0.5 bg-gray-600 w-3/4" />
              <div className="h-0.5 bg-gray-600 w-1/2" />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-white text-sm md:text-base font-light tracking-wide"
          >
            Click to open
          </motion.p>
        </motion.button>
      </div>
    </div>
  );
}
