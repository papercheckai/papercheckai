"use client";

import { ensureUserCreated } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function EnsureUserCreated() {
  const { user } = useUser();
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (user && !isCreated) {
      const interval = setInterval(() => {
        ensureUserCreated()
          .then((created) => {
            console.log("looped", created.toString());
            if (created) {
              setIsCreated(true);
              clearInterval(interval);
            }
          })
          .catch(console.error);
      }, 1000);
    }
  }, [user, isCreated]);

  if (!isCreated)
    return (
      <Button disabled>
        <Loader2Icon className="animate-spin" />
        Please wait
      </Button>
    );
  return (
    <Button asChild>
      <Link href={"/dashboard"}>Dashboard</Link>
    </Button>
  );
}
