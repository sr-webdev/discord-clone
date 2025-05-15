"use client";

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const UserButtonWrapper = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <UserButton />;
};
