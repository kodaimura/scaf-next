"use client";

import { usePathname } from 'next/navigation';
import Link from "next/link";
import styles from './common.module.css';

const Header = () => {
  const pathname = usePathname();

  let buttons;
  if (pathname === "/login") {
    buttons = <Link href="/signup" className={styles.signUpButton}>サインアップ</Link>;
  } else if (pathname === "/signup") {
    buttons = <Link href="/login" className={styles.signInButton}>サインイン</Link>;
  } else if (pathname === "/") {
    buttons = <><Link href="/login" className={styles.signInButton}>サインイン</Link><Link href="/signup" className={styles.signUpButton}>サインアップ</Link></>;
  } else {
    buttons = <button className={styles.signInButton}>ログアウト</button>;
  }
  return (
    <header className={styles.header}>
      <h1>Nextpl</h1>
      <div className={styles.headerButtons}>
        {buttons}
      </div>
    </header>
  );
};
  
export default Header;