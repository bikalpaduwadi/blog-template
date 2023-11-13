"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: string;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "soft",
  toggle: () => {},
});

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem("theme");
    return value || "light";
  }

  return "";
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  const toggle = () => {
    console.log("inside toggle...");
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return {
    theme,
    toggle,
  };
};
