import React from "react";
import Image from "next/image";

import styles from "./featured.module.css";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey there!</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postName}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h1>
          <p className={styles.postDesc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            mollitia amet aliquid, molestias ut minima. Dolorum numquam deleniti
            sit! Vel voluptate ab voluptatem deserunt porro impedit illo
            eligendi atque qui?
          </p>
          <button className={styles.button}>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
