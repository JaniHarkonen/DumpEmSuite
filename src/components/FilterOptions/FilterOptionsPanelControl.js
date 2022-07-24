import { Styles } from "./FilterOptionsPanelControl.styles";
import { FullImage } from "../../common/FullImage";


export default function FilterOptionsPanelControl(props) {
    const caption = props.caption;
    const onClick = props.onClick;
    const iconImage = props.icon;

    return (
        <Styles.Content onClick={onClick}>
            <Styles.IconPanel>
                <Styles.IconAligner>
                    <Styles.IconContainer><FullImage src={iconImage} /></Styles.IconContainer>
                </Styles.IconAligner>
            </Styles.IconPanel>
            
            <Styles.CaptionPanel>
                <Styles.CaptionContainer>{caption}</Styles.CaptionContainer>
            </Styles.CaptionPanel>
        </Styles.Content>
    );
}
