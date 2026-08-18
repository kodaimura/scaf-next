import type { Metadata } from "next";
import ResetPassword from "@/features/auth/ResetPassword";

export const metadata: Metadata = {
  title: "新しいパスワード | ScafNext",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const value = (await searchParams).token;
  const token = Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

  return <ResetPassword token={token} />;
};

export default ResetPasswordPage;
