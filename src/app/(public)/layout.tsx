import type { ReactNode } from "react";
import LayoutPublic from "@layouts/LayoutPublic";

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <LayoutPublic>{children}</LayoutPublic>
);

export default PublicLayout;
