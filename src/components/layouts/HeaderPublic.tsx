import Link from "next/link";
import styles from "@styles/layouts/header.module.css";

const HeaderPublic: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">ScafNext</Link>
      </h1>
    </header>
  );
};

export default HeaderPublic;
