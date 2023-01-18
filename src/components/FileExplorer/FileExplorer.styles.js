import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/FileExplorer.dark";
import { light } from "./themes/FileExplorer.light";

const FileExplorerStyles = { };
FileExplorerStyles[themes.LIGHT] = light;
FileExplorerStyles[themes.DARK] = dark;

export default FileExplorerStyles;