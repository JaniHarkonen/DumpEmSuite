import DialogAPI from "../../apis/DialogAPI";

import ButtonStyles from "./FileLoadButton.styles";
import { FullImage } from "../../common/FullImage";
import { images } from "../../assets/assets";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


export default function FileLoadButton(props) {
    const caption = props.caption;
    const onFileLoad = props.onFileLoad;
    const dialogSettings = props.dialogSettings;

    const { theme } = useContext(ThemeContext);
    const Styles = ButtonStyles[theme];


    const handleFileSelection = (e) => {
        e.stopPropagation();

        DialogAPI.showOpenFile(dialogSettings, (selectedFiles) => {
            if( selectedFiles == null ) return;

            onFileLoad(selectedFiles);
        });
    };

    return (
        <Styles.Content
            title="Select a file to load in"
        >
            <Styles.LoadFileIconPanel>
                <Styles.LoadIconContainer>
                    <Styles.LoadIconAligner><FullImage src={images.folder.add.white} /></Styles.LoadIconAligner>
                </Styles.LoadIconContainer>
            </Styles.LoadFileIconPanel>

            <Styles.LoadFileCaptionPanel>
                <Styles.LoadFileButtonCaptionContainer>
                    {caption}
                </Styles.LoadFileButtonCaptionContainer>
            </Styles.LoadFileCaptionPanel>

            <Styles.LoadFileInput
                onClick={handleFileSelection}
            />
        </Styles.Content>
    );
}
