import React from "react";

import styles from "./blogPage.module.css";
import CardList from "@/components/cardList/CardList";

interface BlogPageProps {
  searchParams: {
    page?: string;
    categoryName?: string;
  };
}

const BlogPage = (props: BlogPageProps) => {
  const { page, categoryName } = props.searchParams;
  const pageNumber = page ? +page : 1;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{categoryName} Posts</h1>
      <div className={styles.content}>
        <CardList page={pageNumber} categoryName={categoryName || ""} />
      </div>
    </div>
  );
};

export default BlogPage;
