import React from "react";

import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

interface CategoryListProps {}

export const CATEGORIES = [
  "style",
  "fashion",
  "food",
  "travel",
  "culture",
  "coding",
];

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            className={`${styles.category} ${styles[category]}`}
            href={`/blog?categoryName=${category}`}
          >
            <Image
              src={`/${category}.png`}
              alt=""
              width={32}
              height={32}
              className={styles.image}
            />
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
