"use client";

import React, { useState } from "react";

import styles from "./authLinks.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface AuthLinksProps {}

const AuthLinks = () => {
  const { status } = useSession();

  const requireLogin = status === "unauthenticated";

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {!requireLogin ? (
        <>
          <Link className={styles.link} href="/write">
            Write
          </Link>
          <span className={styles.link}>Logout</span>
        </>
      ) : (
        <Link className={styles.link} href="/login">
          Login
        </Link>
      )}

      <div
        className={styles.burger}
        onClick={() => setOpenMenu((open) => !open)}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {openMenu && (
        <div className={styles.responsiveMenu}>
          <Link href="/home">Home</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
          {!requireLogin ? (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
