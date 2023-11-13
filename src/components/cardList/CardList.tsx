import React from "react";

import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

interface CardListProps {}

const CardList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.Posts}>
        {[1, 2, 3].map((i) => (
          <Card key={i} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
