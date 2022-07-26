import DialogAPI from "../../apis/DialogAPI";

import { Styles } from "./FileLoadButton.styles";
import { FullImage } from "../../common/FullImage";
import { images } from "../../assets/assets";


export default function FileLoadButton(props) {
    const caption = props.caption;
    const onFileLoad = props.onFileLoad;
    const dialogSettings = props.dialogSettings;


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
