export interface EditableWeddingConfig {
  couple: {
    bride: {
      firstName: string;
      lastName: string;
      fullName: string;
      phone: string;
    };
    groom: {
      firstName: string;
      lastName: string;
      fullName: string;
      phone: string;
    };
  };
  ceremony: {
    time: string;
    locationName: string;
    address: string;
    googleMapsUrl: string;
  };
  reception: {
    locationName: string;
    address: string;
    googleMapsUrl: string;
  };
  date: {
    year: number;
    month: number; // 1-12
    day: number;
  };
  telegramQrCode?: string; // base64 or URL
}
