import { notFound } from "next/navigation";
import InvitationClient from "@/components/InvitationClient";
import { InvitationService } from "@/lib/services/invitation-service";
import { getTranslation } from "@/lib/i18n/locales";

// Force dynamic rendering - no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch invitation server-side
  const invitationService = InvitationService.getInstance();
  const invitation = await invitationService.getBySlug(slug);

  if (!invitation) {
    notFound();
  }

  // Get translations server-side
  const translations = getTranslation(invitation.language);

  return (
    <InvitationClient invitation={invitation} translations={translations} />
  );
}
