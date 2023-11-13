import React from "react";
import Image from "next/image";

import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="" width={50} height={50} />
          <h1 className={styles.logoText}>Myblog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
          ipsa nam sequi cupiditate eos commodi a quidem laboriosam harum qui
          error, consequuntur non voluptas, enim asperiores autem. Totam,
          repudiandae quod?
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" height={18} width={18} />
          <Image src="/instagram.png" alt="" height={18} width={18} />
          <Image src="/tiktok.png" alt="" height={18} width={18} />
          <Image src="/youtube.png" alt="" height={18} width={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/home">Home</Link>
          <Link href="/home">Blog</Link>
          <Link href="/home">About</Link>
          <Link href="/home">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/home">Style</Link>
          <Link href="/home">Fashion</Link>
          <Link href="/home">Coding</Link>
          <Link href="/home">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/home">Facebook</Link>
          <Link href="/home">Instagram</Link>
          <Link href="/home">Tiktok</Link>
          <Link href="/home">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
