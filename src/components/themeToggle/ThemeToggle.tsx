"use client";

import React from "react";
import Image from "next/image";

import { useThemeContext } from "@/context/ThemeContext";

import styles from "./themeToggle.module.css";

interface ThemeToggleProps {}

const ThemeToggle = () => {
  const { theme, toggle } = useThemeContext();

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark" ? { background: "white" } : { background: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 2, background: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="sun" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
