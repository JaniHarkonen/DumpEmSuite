import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import FilterOptionsPanelControlStyles from "./FilterOptionsPanelControl.styles";
import { FullImage } from "../../common/FullImage";


export default function FilterOptionsPanelControl(props) {
    const caption = props.caption;
    const onClick = props.onClick;
    const iconImage = props.icon;
    const tooltip = props.tooltip;

    const { theme } = useContext(ThemeContext);
    const Styles = FilterOptionsPanelControlStyles[theme];
    
    return (
        <Styles.Content
            title={tooltip}
            onClick={onClick}
        >
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
