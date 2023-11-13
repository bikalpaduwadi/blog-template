import React from "react";

import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";

interface CommentsProps {}

const Comments = () => {
  const isAuthenticated = true;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {isAuthenticated ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
          ></textarea>
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}

      <div className={styles.comments}>
        {[1, 2, 3, 4].map((i) => (
          <div key={"comment-" + i} className={styles.comment}>
            <div className={styles.user}>
              <Image
                src="/p1.jpeg"
                alt=""
                width={50}
                height={50}
                className={styles.image}
              />
              <div className={styles.userInfo}>
                <span className={styles.username}>Jhon Doe</span>
                <span className={styles.date}>{new Date().toDateString()}</span>
              </div>
            </div>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Cupiditate ipsa aperiam aliquam consequuntur quo, consequatur
              fugit dolor aspernatur nisi eaque cum totam omnis deserunt non
              tempore laboriosam debitis, expedita dicta.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
