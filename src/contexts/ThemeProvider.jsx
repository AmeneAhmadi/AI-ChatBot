import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => (prev = !prev));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
ThemeProvider.propTypes = {
    children: PropTypes.node,
}