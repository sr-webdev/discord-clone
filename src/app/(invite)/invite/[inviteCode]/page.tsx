import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: { inviteCode: string };
}

const InviteCodePage = async ({ params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;

  const { inviteCode } = await params;

  if (!inviteCode) redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) redirect(`/servers/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) redirect(`/servers/${server.id}`);

  return null;
};

export default InviteCodePage;
