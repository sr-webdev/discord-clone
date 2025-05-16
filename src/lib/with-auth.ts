import { NextRequest } from "next/server";
import { currentProfile } from "./current-profile";
import { Profile } from "@/generated/prisma";

type Handler = (
  req: NextRequest,
  context: any,
  profile: Profile
) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const profile = await currentProfile();
    console.log("wrapper: ", profile);

    if (!profile) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If authenticated, call the original handler
    return handler(req, context, profile);
  };
}
