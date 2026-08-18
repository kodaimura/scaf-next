import type { Metadata } from "next";
import Login from "@/features/auth/Login";
import { PASSWORD_CHANGED_PARAM, REDIRECT_PARAM } from "@/routes";

export const metadata: Metadata = {
  title: "ログイン | ScafNext",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? null) : (value ?? null);

const LoginPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams;

  return (
    <Login
      passwordChanged={firstValue(params[PASSWORD_CHANGED_PARAM]) === "1"}
      redirectFrom={firstValue(params[REDIRECT_PARAM])}
    />
  );
};

export default LoginPage;
