/**
 * Wedding Configuration
 *
 * Central configuration file for all wedding details.
 * Update these values to customize the invitation.
 */

export const weddingConfig = {
  couple: {
    bride: {
      firstName: "Hermione",
      lastName: "Granger",
      fullName: "Hermione Granger",
      phone: "+1 555 123 4567",
    },
    groom: {
      firstName: "Shrek",
      lastName: "Ogre",
      fullName: "Shrek Ogre",
      phone: "+1 555 765 4321",
    },
  },

  date: {
    full: "December 25, 2026",
    year: 2026,
    month: 12,
    day: 25,
  },

  ceremony: {
    time: "15:00",
    locationName: "Enchanted Forest Chapel",
    locationShort: "Forest Chapel",
    address: "123 Magic Lane, Fairy Tale Village",
    city: "Far Far Away",
  },

  reception: {
    locationName: "Dragon's Keep Ballroom",
    locationShort: "Dragon's Keep",
    address: "456 Swamp Road, Far Far Away",
    city: "Far Far Away",
  },

  rsvp: {
    deadline: "November 30, 2026",
    deadlineDate: new Date("2026-11-30"),
  },

  design: {
    colors: {
      primary: "navy",
      secondary: "burgundy",
      accent: "cream",
    },
    fonts: {
      serif: "Playfair Display",
      sansSerif: "Inter",
    },
  },

  // Social/Contact
  whatsappGroupUrl: "", // Optional: Add WhatsApp group invite link
  websiteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

// Helper function to get couple's initials
export const getCoupleInitials = () => {
  const { bride, groom } = weddingConfig.couple;
  return `${bride.firstName[0]}${groom.firstName[0]}`;
};

// Helper function to get couple names for display
export const getCoupleNames = (format: "full" | "first" | "last" = "full") => {
  const { bride, groom } = weddingConfig.couple;

  switch (format) {
    case "first":
      return `${bride.firstName} & ${groom.firstName}`;
    case "last":
      return `${bride.lastName} & ${groom.lastName}`;
    case "full":
    default:
      return `${bride.fullName} & ${groom.fullName}`;
  }
};

// Helper function to check if RSVP is still open
export const isRSVPOpen = () => {
  return new Date() < weddingConfig.rsvp.deadlineDate;
};

// Helper function to format date for display
export const getWeddingDate = (format: "full" | "short" | "iso" = "full") => {
  const { year, month, day } = weddingConfig.date;
  const date = new Date(year, month - 1, day);

  switch (format) {
    case "short":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    case "iso":
      return date.toISOString().split("T")[0];
    case "full":
    default:
      return weddingConfig.date.full;
  }
};

export type WeddingConfig = typeof weddingConfig;
