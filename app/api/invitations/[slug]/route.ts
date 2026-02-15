import { NextResponse } from "next/server";
import { InvitationService } from "@/lib/services/invitation-service";

const invitationService = InvitationService.getInstance();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const invitation = await invitationService.getBySlug(slug);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(invitation);
  } catch (error) {
    console.error("Failed to fetch invitation:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitation" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const success = await invitationService.markAsRead(slug);

    if (!success) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark invitation as read:", error);
    return NextResponse.json(
      { error: "Failed to update invitation" },
      { status: 500 },
    );
  }
}
