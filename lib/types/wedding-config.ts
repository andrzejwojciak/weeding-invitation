export interface LocalizedLocation {
  en: {
    locationName: string;
    address: string;
  };
  pl: {
    locationName: string;
    address: string;
  };
  uk: {
    locationName: string;
    address: string;
  };
}

export interface LocalizedPerson {
  en: {
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
  };
  pl: {
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
  };
  uk: {
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
  };
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
  groupQrCode?: {
    en?: string; // base64 or URL
    pl?: string; // base64 or URL
    uk?: string; // base64 or URL
  };
}
