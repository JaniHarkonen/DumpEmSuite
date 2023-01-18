import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/AnalysisDisplay.dark";
import { light } from "./themes/AnalysisDisplay.light";

const AnalysisDisplayStyles = { };
AnalysisDisplayStyles[themes.LIGHT] = light;
AnalysisDisplayStyles[themes.DARK] = dark;

export default AnalysisDisplayStyles;
