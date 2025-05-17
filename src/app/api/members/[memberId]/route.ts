import { Profile } from "@/generated/prisma";
import { db } from "@/lib/db";
import { withAuth } from "@/lib/with-auth";
import { updateMemberRoleSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

async function secretPATCH(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
  profile: Profile
) {
  try {
    const { memberId } = await params;
    if (!memberId)
      return new NextResponse("Member ID Missing", { status: 400 });

    const searchParams = req.nextUrl.searchParams;

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const { role } = await req.json();

    const validatedRole = updateMemberRoleSchema.parse(role);

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: { not: profile.id },
            },
            data: {
              role: validatedRole,
            },
          },
        },
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[MEMBER_ID_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const PATCH = withAuth(secretPATCH);

async function secretDELETE(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
  profile: Profile
) {
  try {
    const { memberId } = await params;
    if (!memberId)
      return new NextResponse("Member ID Missing", { status: 400 });

    const searchParams = req.nextUrl.searchParams;

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          delete: {
            id: memberId,
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[MEMBER_ID_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const DELETE = withAuth(secretDELETE);
