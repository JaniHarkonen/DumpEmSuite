import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/Analysis.dark";
import { light } from "./themes/Analysis.light";

const AnalysisStyles = { };
AnalysisStyles[themes.LIGHT] = light;
AnalysisStyles[themes.DARK] = dark;

export default AnalysisStyles;

