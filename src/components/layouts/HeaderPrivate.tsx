"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@contexts/AuthContext";
import { KebabMenu } from "@ui/index";
import { ROUTES } from "@/routes";
import styles from "@styles/layouts/header.module.css";

const HeaderPrivate: React.FC = () => {
  const router = useRouter();
  const { account, logout } = useAuth();
  const accountName = account
    ? `${account.last_name} ${account.first_name}`.trim()
    : "Account";

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">ScafNext</Link>
      </h1>
      <nav className={styles.nav}>
        <span className={styles.accountName}>{accountName}</span>
        <KebabMenu
          ariaLabel="アカウントメニューを開く"
          icon={<UserCircle size={20} />}
          items={[
            {
              icon: <KeyRound size={16} />,
              label: "パスワード変更",
              onClick: () => router.push(ROUTES.changePassword),
            },
            {
              icon: <LogOut size={16} />,
              label: "ログアウト",
              onClick: logout,
            },
          ]}
        />
      </nav>
    </header>
  );
};

export default HeaderPrivate;
