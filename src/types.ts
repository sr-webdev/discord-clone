import { Channel, Member, Profile, Server } from "./generated/prisma";

export type ServerWithChannelsWithProfiles = Server & {
  channels: Channel[];
} & {
  members: (Member & { profile: Profile })[];
};
