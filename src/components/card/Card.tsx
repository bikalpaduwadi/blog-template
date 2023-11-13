import React from "react";
import Image from "next/image";

import styles from "./card.module.css";
import Link from "next/link";

interface CardProps {}

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{new Date().toLocaleDateString()}</span>
          <span className={styles.categoryTitle}> - CULTURE</span>
        </div>
        <Link href="/">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          obcaecati at distinctio, debitis, quam, iste eum sit libero excepturi
          nisi fuga non in placeat illum amet? Fugit ratione consequatur soluta.
        </p>
        <Link className={styles.link} href="/">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
