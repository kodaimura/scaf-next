import type { ReactNode } from "react";
import GuestRoute from "@components/auth/GuestRoute";

const GuestLayout = ({ children }: { children: ReactNode }) => (
  <GuestRoute>{children}</GuestRoute>
);

export default GuestLayout;
