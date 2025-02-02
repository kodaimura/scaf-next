import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1>Nextpl</h1>
        <div className={styles.headerButtons}>
          <Link href="/login" className={styles.signInButton}>
            サインイン
          </Link>
          <Link href="/signup" className={styles.signUpButton}>
            サインアップ
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>Getting Started</h2>
          <p>Next.js makes building web applications easy and efficient.</p>
        </section>
      </main>
    </>
  );
}
