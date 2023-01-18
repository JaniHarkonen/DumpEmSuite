import React from "react";

export const themes = {
    LIGHT: "light",
    DARK: "dark"
};

export const ThemeContext = React.createContext({
    theme: themes.LIGHT,
    setTheme: (theme) => {}
});
