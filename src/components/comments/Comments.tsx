"use client";

import useSWR from "swr";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./comments.module.css";
import { useSession } from "next-auth/react";
import { AppComment } from "@/models/Prisma";

interface CommentsProps {
  postSlug: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data as AppComment[];
};

const Comments = (props: CommentsProps) => {
  const { postSlug } = props;
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [desc, setDesc] = useState("");
  const { isLoading, mutate, data } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({ description: desc, postSlug }),
    });

    mutate();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {isAuthenticated ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}

      <div className={styles.comments}>
        {data?.map((item) => (
          <div key={"comment-" + item.id} className={styles.comment}>
            <div className={styles.user}>
              {item?.user?.image && (
                <Image
                  src={item.user.image}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{item?.user?.name}</span>
                <span className={styles.date}>
                  {item.createdAt ? item.createdAt.toString() : ""}
                </span>
              </div>
            </div>
            <p className={styles.desc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
