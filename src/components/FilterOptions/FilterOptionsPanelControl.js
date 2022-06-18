import { Styles } from "./FilterOptionsPanelControl.styles";

export default function FilterOptionsPanelControl(props) {
    const caption = props.caption;
    const onClick = props.onClick;

    return (
        <Styles.Content onClick={onClick}>
            {caption}
        </Styles.Content>
    );
}

