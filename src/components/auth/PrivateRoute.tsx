"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/AuthContext";
import { buildLoginPathWithFrom } from "@/routes";
import LayoutPrivate from "@layouts/LayoutPrivate";
import Processing from "@ui/Processing";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { account, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || account) return;

    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    router.replace(buildLoginPathWithFrom(currentPath));
  }, [account, loading, router]);

  if (loading || !account) return <Processing text="読み込み中..." />;

  return <LayoutPrivate>{children}</LayoutPrivate>;
};

export default PrivateRoute;
