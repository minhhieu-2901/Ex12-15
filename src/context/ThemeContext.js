import { createContext, useState } from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#ffffff",
  },
  dark: {
    foreground: "#ffffff",
    background: "#000000",
  },
};

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");
  const theme = themes[themeName];

  const toggleTheme = () => {
    setThemeName((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
