"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, HttpError } from "@lib/api";
import { getApiErrorMessage } from "@lib/errorMessages";
import { waitAtLeast, waitForProcessingPaint } from "@lib/loading";
import { validateEmail, validateRequired } from "@lib/validation";
import { useAuth } from "@contexts/AuthContext";
import { getSafeRedirectPath, ROUTES } from "@/routes";
import type { LoginRequest, LoginResponse } from "@/features/auth/apiTypes";
import {
  Button,
  ErrorMessage,
  FormField,
  InfoMessage,
  Input,
  PasswordInput,
  Processing,
} from "@ui/index";
import styles from "@styles/pages/login/login.module.css";

type LoginProps = {
  passwordChanged: boolean;
  redirectFrom: string | null;
};

const Login = ({ passwordChanged, redirectFrom }: LoginProps) => {
  const { setAccount, setAccessToken } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): string | null => {
    return validateEmail(email) ?? validateRequired(password, "パスワード");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const startedAt = Date.now();
    setLoading(true);
    await waitForProcessingPaint();

    try {
      const res = await api.post<LoginResponse, LoginRequest>("auth/login", {
        login_id: email,
        password,
      });

      setAccount(res.account);
      setAccessToken(res.access_token);
      router.replace(getSafeRedirectPath(redirectFrom));
    } catch (err: unknown) {
      if (err instanceof HttpError && err.status === 401) {
        setError(
          getApiErrorMessage(
            err,
            "メールアドレスまたはパスワードが間違っています。",
          ),
        );
      } else {
        setError("ログインに失敗しました。もう一度お試しください。");
      }
    } finally {
      await waitAtLeast(startedAt);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Processing text="ログイン中..." />}
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h1 className={styles.title}>ログイン</h1>

        {passwordChanged && (
          <InfoMessage className={styles.message}>
            パスワードを変更しました。新しいパスワードでログインしてください。
          </InfoMessage>
        )}

        <ErrorMessage className={styles.message} message={error} />

        <FormField htmlFor="email" label="メールアドレス" required>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>

        <FormField htmlFor="password" label="パスワード" required>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>

        <Button
          type="submit"
          className={styles.button}
          disabled={loading}
          loading={loading}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </Button>

        <p className={styles.text}>
          <Link href={ROUTES.forgotPassword} className={styles.link}>
            パスワードをお忘れですか？
          </Link>
        </p>

        <p className={styles.text}>
          アカウントをお持ちでない方は{" "}
          <Link href={ROUTES.signup} className={styles.link}>
            登録はこちら
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
