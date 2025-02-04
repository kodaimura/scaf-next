"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("サインアップ中...", { username, email, password });
    // サインアップ処理
  };

  return (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                ユーザー名
              </label>
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
              <label htmlFor="email" className={styles.label}>
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              サインアップ
            </button>
          </form>
        </div>
  );
};

export default SignupPage;
