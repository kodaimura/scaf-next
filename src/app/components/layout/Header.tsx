import styles from './header.module.css';

interface Props {
  children: React.ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>scaf-next</h1>
      <div className={styles.childrenWrapper}>
        {children}
      </div>
    </header>
  );
};

export default Header;