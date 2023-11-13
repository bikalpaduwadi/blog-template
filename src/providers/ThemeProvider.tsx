"use client";

import React from "react";
import { useThemeContext } from "@/context/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
