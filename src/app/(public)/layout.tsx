import type { ReactNode } from "react";
import PublicRoute from "@components/auth/PublicRoute";

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <PublicRoute>{children}</PublicRoute>
);

export default PublicLayout;
