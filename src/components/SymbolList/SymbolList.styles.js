import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/dark";
import { light } from "./themes/light";

const SymbolListStyles = { };
SymbolListStyles[themes.LIGHT] = light;
SymbolListStyles[themes.DARK] = dark;

export default SymbolListStyles;
