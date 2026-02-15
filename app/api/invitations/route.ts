import { NextResponse } from "next/server";
import { InvitationService } from "@/lib/services/invitation-service";

const invitationService = InvitationService.getInstance();

export async function GET() {
  try {
    const invitations = await invitationService.getAllInvitations();
    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Failed to fetch invitations:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipientName } = body;

    if (!recipientName || typeof recipientName !== "string") {
      return NextResponse.json(
        { error: "Invalid recipient name" },
        { status: 400 },
      );
    }

    const invitation = await invitationService.create({ recipientName });
    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Failed to create invitation:", error);
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 },
    );
  }
}
