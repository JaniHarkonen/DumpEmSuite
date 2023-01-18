import ButtonStyles from "../FileLoadButton/FileLoadButton.styles";
import { FullImage } from "../../common/FullImage";
import { images } from "../../assets/assets";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const { exec } = window.require("child_process");


export default function OpenExplorerButton(props) {
    const openPath = props.path;

    const { theme } = useContext(ThemeContext);
    const Styles = ButtonStyles[theme];
    

    const handleExplorerOpen = (path) => {
        if( !path || path === "" ) return;

        exec(`explorer "${path}"`);
    };

    return(
        <Styles.Content
            title="Reveal the folder in File Explorer"
        >
            <Styles.LoadFileIconPanel>
                <Styles.LoadIconContainer>
                    <Styles.LoadIconAligner><FullImage src={images.openExternal.white} /></Styles.LoadIconAligner>
                </Styles.LoadIconContainer>
            </Styles.LoadFileIconPanel>

            <Styles.LoadFileCaptionPanel>
                <Styles.LoadFileButtonCaptionContainer>
                    Open in explorer
                </Styles.LoadFileButtonCaptionContainer>
            </Styles.LoadFileCaptionPanel>

            <Styles.LoadFileInput
                onClick={() => {
                    handleExplorerOpen(openPath);
                }}
            />
        </Styles.Content>
    );
}
