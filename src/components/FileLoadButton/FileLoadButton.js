import { Styles } from "./FileLoadButton.styles";
import { images } from "../../assets/assets";
import { FullImage } from "../../common/FullImage";

export default function FileLoadButton(props) {
    const caption = props.caption;
    const allowMultiple = props.allowMultiple || false;
    const onFileLoad = props.onFileLoad;

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
                type="file"
                multiple={allowMultiple}
                onChange={onFileLoad}
            />
        </Styles.Content>
    );
}
