import React from "react";
import Link from "next/link";

import styles from "./menu.module.css";

import { CATEGORIES } from "../categoryList/CategoryList";
import MenuPosts from "../menuPosts/MenuPosts";

interface MenuProps {}

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts showImage={false} />

      <div className={styles.categories}>
        <h2 className={styles.subtitle}>Discover by topic</h2>
        <h1 className={styles.title}>Categories</h1>

        <div className={styles.categoryList}>
          {CATEGORIES.map((category, index) => (
            <Link
              key={category + "-" + index}
              href={`/blog?cat=${category}`}
              className={`${styles.categoryItem} ${styles[category]}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>

      <MenuPosts showImage />
    </div>
  );
};

export default Menu;
