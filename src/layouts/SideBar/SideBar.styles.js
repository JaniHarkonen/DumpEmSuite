import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/SideBar.dark";
import { light } from "./themes/SideBar.light";

const SideBarStyles = { };
SideBarStyles[themes.LIGHT] = light;
SideBarStyles[themes.DARK] = dark;

export default SideBarStyles;
