"use client";

import Image from "next/image";
import ActionTooltip from "./action-tooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: Props) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className="group relative flex items-center cursor-pointer"
        onClick={onClick}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-1",
            params.serverId === id ? "h-9" : "h-2 group-hover:h-5"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 w-12 h-12 rounded-full group-hover:rounded-[16px] transition-all overflow-hidden",
            params.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};
