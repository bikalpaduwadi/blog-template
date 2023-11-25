import React from "react";
import Image from "next/image";

import styles from "./card.module.css";
import Link from "next/link";
import { Post } from "@prisma/client";

interface CardProps {
  post: Post;
}

const Card = (props: CardProps) => {
  const { post } = props;
  return (
    <div className={styles.container}>
      {post.imageUrl && (
        <div className={styles.imageContainer}>
          <Image src={post.imageUrl} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(post.createdAt).toDateString()}
          </span>
          <span className={styles.categoryTitle}> - {post.categorySlug}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <p className={styles.desc}>{post.description.substring(0, 50)}</p>
        <Link className={styles.link} href={`/posts/${post.slug}`}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
