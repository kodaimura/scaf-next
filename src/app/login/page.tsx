"use client";

import React, { useState } from 'react';
import Link from "next/link";
import styles from './page.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理
    console.log('ログイン中...', { username, password });
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Nextpl</h1>
        <Link href="/signup" className={styles.signUpButton}>
          サインアップ
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>ユーザー名</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>パスワード</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>ログイン</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
