import { ChannelType, MemberRole } from "@/generated/prisma";
import * as z from "zod";

export const serverSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const memberRoleSchema = z.nativeEnum(MemberRole);
export const updateMemberRoleSchema = z.enum([
  MemberRole.GUEST,
  MemberRole.MODERATOR,
]);

export const channelSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name.toLowerCase() !== "general", {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
});
