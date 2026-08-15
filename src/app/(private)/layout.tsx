import type { ReactNode } from "react";
import PrivateRoute from "@components/auth/PrivateRoute";

const PrivateLayout = ({ children }: { children: ReactNode }) => (
  <PrivateRoute>{children}</PrivateRoute>
);

export default PrivateLayout;
