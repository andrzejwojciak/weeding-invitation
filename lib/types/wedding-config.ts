export interface LocalizedLocation {
  base: {
    locationName: string;
    address: string;
  };
  en?: {
    locationName?: string;
    address?: string;
  };
  pl?: {
    locationName?: string;
    address?: string;
  };
  uk?: {
    locationName?: string;
    address?: string;
  };
}

export interface LocalizedPerson {
  base: {
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
  };
  en?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
  };
  pl?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
  };
  uk?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
  };
}

export interface LocalizedText {
  base: string;
  en?: string;
  pl?: string;
  uk?: string;
}

export interface EditableWeddingConfig {
  couple: {
    bride: LocalizedPerson;
    groom: LocalizedPerson;
  };
  ceremony: {
    time: string;
    googleMapsUrl: string;
  } & LocalizedLocation;
  reception: {
    googleMapsUrl: string;
  } & LocalizedLocation;
  date: {
    year: number;
    month: number; // 1-12
    day: number;
  };
  dressCode?: LocalizedText;
  groupQrCode?: {
    en?: string; // base64 or URL
    pl?: string; // base64 or URL
    uk?: string; // base64 or URL
  };
  backgroundImage?: string; // base64 or URL
  backgroundPosition?: "full" | "main-section" | "header" | "between-header";
}
