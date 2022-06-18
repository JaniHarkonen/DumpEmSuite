import { FullImage } from "../../common/FullImage";
import { Styles } from "./ImageButton.styles";

export default function ImageButton(props) {
    const tooltip = props.tooltip;
    const image = props.image;
    const onClick = props.onClick;

    return (
        <Styles.Content
            title={tooltip}
            onClick={onClick}
        >
            <Styles.ImageContainer>
                <FullImage src={image} />
            </Styles.ImageContainer>
        </Styles.Content>
    );
}
