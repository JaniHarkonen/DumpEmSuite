import { Styles } from "../FileLoadButton/FileLoadButton.styles";
import { FullImage } from "../../common/FullImage";
import { images } from "../../assets/assets";

const { exec } = window.require("child_process");

export default function OpenExplorerButton(props) {
    const openPath = props.path;
    

    const handleExplorerOpen = (path) => {
        if( !path || path === "" ) return;

        exec(`explorer "${path}"`);
    }

    return(
        <Styles.Content>
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
