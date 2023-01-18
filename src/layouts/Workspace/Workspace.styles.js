import { themes } from "../../contexts/ThemeContext";
import { dark } from "./themes/Workspace.dark";
import { light } from "./themes/Workspace.light";

const WorkspaceStyles = { };
WorkspaceStyles[themes.LIGHT] = light;
WorkspaceStyles[themes.DARK] = dark;

export default WorkspaceStyles;
