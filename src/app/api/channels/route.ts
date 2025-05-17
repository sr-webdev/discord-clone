import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MemberRole, Profile } from "@/generated/prisma";
import { channelSchema } from "@/schemas";
import { withAuth } from "@/lib/with-auth";

async function secretPOST(req: NextRequest, {}, profile: Profile) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const { name, type } = await req.json();

    const validatedFields = channelSchema.parse({ name, type });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: { profileId: profile.id, ...validatedFields },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[CHANNELS_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const POST = withAuth(secretPOST);
