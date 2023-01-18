import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/FilterOptionsPanel.dark";
import { light } from "./themes/FilterOptionsPanel.light";

const FilterOptionsPanelStyles = { };
FilterOptionsPanelStyles[themes.LIGHT] = light;
FilterOptionsPanelStyles[themes.DARK] = dark;

export default FilterOptionsPanelStyles;
