import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/FilterOptionsPanelControl.dark";
import { light } from "./themes/FilterOptionsPanelControl.light";

const FilterOptionsPanelControlStyles = { };
FilterOptionsPanelControlStyles[themes.LIGHT] = light;
FilterOptionsPanelControlStyles[themes.DARK] = dark;

export default FilterOptionsPanelControlStyles;
