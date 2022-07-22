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
        <Styles.Content>
            <Styles.LoadFileIconPanel>
                <FullImage src={images.folder.white} />
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
