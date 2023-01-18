import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/ButtonStyles.dark";
import { light } from "./themes/ButtonStyles.light";

const ButtonStyles = { };
ButtonStyles[themes.LIGHT] = light;
ButtonStyles[themes.DARK] = dark;

export default ButtonStyles;
