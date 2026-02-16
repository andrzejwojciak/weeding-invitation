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

export async function GET(request: Request) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  if (!validateAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { recipientName, language } = body;

    if (!recipientName || typeof recipientName !== "string") {
      return NextResponse.json(
        { error: "Invalid recipient name" },
        { status: 400 },
      );
    }

    if (!language || !["en", "pl", "uk"].includes(language)) {
      return NextResponse.json(
        { error: "Invalid language" },
        { status: 400 },
      );
    }

    const invitation = await invitationService.create({ 
      recipientName,
      language,
    });
    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Failed to create invitation:", error);
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 },
    );
  }
}
