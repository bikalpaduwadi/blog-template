import React from "react";
import Image from "next/image";

import { AppPost } from "@/models/Prisma";
import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/Comments";

import styles from "./singlePage.module.css";

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage = async (props: SinglePageProps) => {
  const { slug } = props.params;

  const post: AppPost = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.user}>
            {post.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={post.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post.user.name}</span>
              <span className={styles.date}>{new Date().toDateString()}</span>
            </div>
          </div>
        </div>
        {post.imageUrl && (
          <div className={styles.imageContainer}>
            <Image src={post.imageUrl} alt="" fill className={styles.image} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            // dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
