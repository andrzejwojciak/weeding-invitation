import { NextResponse } from "next/server";
import { InvitationService } from "@/lib/services/invitation-service";

const invitationService = InvitationService.getInstance();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";

function validateAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_SECRET_KEY;
}

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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const invitation = await invitationService.getBySlug(slug);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 },
      );
    }

    const success = await invitationService.delete(invitation.id);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete invitation" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete invitation:", error);
    return NextResponse.json(
      { error: "Failed to delete invitation" },
      { status: 500 },
    );
  }
}
