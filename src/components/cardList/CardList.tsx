import React from "react";

import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { Post } from "@prisma/client";

interface CardListProps {
  page: number;
  categoryName: string;
}

const getData = async (page: number, categoryName: string) => {
  const res = await fetch(
    `http://localhost:3005/api/posts?page=${page}&categoryName=${categoryName}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async (props: CardListProps) => {
  const { posts, count }: { posts: Post[]; count: number } = await getData(
    props.page,
    props.categoryName
  );

  const POST_PER_PAGE = 2;
  const hasPrev = props.page - 1 > 0;
  const hasNext = count > props.page * POST_PER_PAGE;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.Posts}>
        {posts.map((post: Post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination page={props.page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
