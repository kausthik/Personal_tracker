"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      variant="outline"
      disabled={pending}
      onClick={() => {
        setPending(true);
        signOut({ redirectTo: "/login" });
      }}
      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="size-4" />
      {pending ? "Logging out..." : "Log out"}
    </Button>
  );
}
