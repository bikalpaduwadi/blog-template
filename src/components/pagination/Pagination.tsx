"use client";

import React from "react";

import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { page, hasPrev, hasNext } = props;
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${+page - 1}`)}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => router.push(`?page=${+page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
