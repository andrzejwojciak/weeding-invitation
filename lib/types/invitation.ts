export interface Invitation {
  id: string;
  slug: string;
  recipientName: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateInvitationDto {
  recipientName: string;
}
