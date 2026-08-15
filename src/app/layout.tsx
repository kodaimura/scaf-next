import type { Metadata } from "next";
import { AuthProvider } from "@contexts/AuthContext";
import "@styles/global.css";

export const metadata: Metadata = {
  title: "ScafNext",
  description: "Next.js frontend scaffold",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="ja">
    <body>
      <AuthProvider>{children}</AuthProvider>
    </body>
  </html>
);

export default RootLayout;
