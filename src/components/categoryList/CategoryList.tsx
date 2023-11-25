import React from "react";

import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@prisma/client";

interface CategoryListProps {}

export const CATEGORIES = [
  "style",
  "fashion",
  "food",
  "travel",
  "culture",
  "coding",
];

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const categories: Category[] = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={`${styles.category} ${styles[category.title]}`}
            href={`/blog?categoryName=${category.title}`}
          >
            {category.imageUrl && (
              <Image
                src={category.imageUrl}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
