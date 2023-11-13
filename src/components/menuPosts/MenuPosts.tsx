import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./menuPosts.module.css";

interface MenuPostsProps {
  showImage: boolean;
}

const POPULAR_CATEGORIES = ["travel", "culture", "fashion", "food"];

const MenuPosts = (props: MenuPostsProps) => {
  return (
    <div className={styles.items}>
      {POPULAR_CATEGORIES.map((category) => (
        <Link href="/" key={category} className={styles.item}>
          {props.showImage && (
            <div className={styles.imageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[category]}`}>
              {category}
            </span>
            <h3 className={styles.postTitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span> - {new Date().toDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
