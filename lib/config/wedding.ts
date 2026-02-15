/**
 * Wedding Configuration
 *
 * Central configuration file for all wedding details.
 * Update these values to customize the invitation.
 */

export const weddingConfig = {
  couple: {
    bride: {
      firstName: "Sofiia",
      lastName: "Havrilchenko",
      fullName: "Sofiia Havrilchenko",
      phone: "666 710 336",
    },
    groom: {
      firstName: "Andrzej",
      lastName: "Wójciak",
      fullName: "Andrzej Wójciak",
      phone: "731 506 200",
    },
  },

  date: {
    full: "June 13, 2026",
    year: 2026,
    month: 6,
    day: 13,
  },

  ceremony: {
    time: "14:00",
    locationName: "Chapel of Our Lady on the Hill",
    locationShort: "Kaplica Matki Bożej na Wzgórzu",
    address: "Lipska 36, 51-003 Wrocław",
    city: "Wrocław",
  },

  reception: {
    locationName: "Topacz Castle",
    locationShort: "Zamek Topacz",
    address: "Templariuszy 1, 55-040 Ślęza",
    city: "Ślęza",
  },

  rsvp: {
    deadline: "May 23, 2026",
    deadlineDate: new Date("2026-05-23"),
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
