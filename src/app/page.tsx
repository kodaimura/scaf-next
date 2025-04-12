import styles from "./page.module.css";
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <Image src="next.svg" alt="logo"></Image>
      <section className={styles.intro}>
        <h2>Getting Started</h2>
        <p>Next.js makes building web applications easy and efficient.</p>
      </section>
    </div>
  );
}
