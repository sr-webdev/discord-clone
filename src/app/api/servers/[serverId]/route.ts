import { Profile } from "@/generated/prisma";
import { db } from "@/lib/db";
import { withAuth } from "@/lib/with-auth";
import { NextRequest, NextResponse } from "next/server";
import { serverSchema } from "@/schemas";

async function secretPATCH(
  req: NextRequest,
  { params }: { params: Promise<{ serverId: string }> },
  profile: Profile
) {
  try {
    const { serverId } = await params;

    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const body = await req.json();

    const validatedFields = serverSchema.parse(body);

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        ...validatedFields,
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const PATCH = withAuth(secretPATCH);
