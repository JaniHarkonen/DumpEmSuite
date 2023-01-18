import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/NoteStyles.dark";
import { light } from "./themes/NoteStyles.light";

const NoteStyles = { };
NoteStyles[themes.LIGHT] = light;
NoteStyles[themes.DARK] = dark;

export default NoteStyles;
