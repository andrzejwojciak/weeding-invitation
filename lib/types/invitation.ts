import type { Language } from "../i18n/locales";

export interface Invitation {
  id: string;
  slug: string;
  recipientName: string;
  language: Language;
  isRead: boolean;
  createdAt: string;
}

export interface CreateInvitationDto {
  recipientName: string;
  language: Language;
}
