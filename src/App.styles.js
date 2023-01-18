import { themes } from "./contexts/ThemeContext";
import { dark } from "./App.dark";
import { light } from "./App.light";

const AppStyles = { };
AppStyles[themes.LIGHT] = light;
AppStyles[themes.DARK] = dark;

export default AppStyles;
