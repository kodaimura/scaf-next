"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/AuthContext";
import { ROUTES } from "@/routes";
import LayoutPublic from "@layouts/LayoutPublic";
import Processing from "@ui/Processing";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { account, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && account) router.replace(ROUTES.home);
  }, [account, loading, router]);

  if (loading || account) return <Processing text="読み込み中..." />;

  return <LayoutPublic>{children}</LayoutPublic>;
};

export default PublicRoute;
