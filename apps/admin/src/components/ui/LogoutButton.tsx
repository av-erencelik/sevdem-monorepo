"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOutIcon } from "lucide-react";

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
        router.replace("/giris");
      }}
      disabled={isLoading}
      variant="secondary"
      size="sm"
      className="text-sky-600 transition-colors hover:text-sky-600"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          <LogOutIcon className="mr-2" size={18} />
          Çıkış Yap
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
