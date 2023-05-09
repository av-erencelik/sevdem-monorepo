"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setIsLoading(true);
        await signOut();
        setIsLoading(false);
        router.replace("/");
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
};

export default LogoutButton;
