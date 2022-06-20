
import ModalAPI from "../../../apis/ModalAPI";
import { getKey } from "../../../utils/KeyManager";
import { Styles } from "./Prompt.styles";

export default function ModalView(props) {
    const title = props.title;
    const disableClose = props.disableClose || false;
    const disableBackground = props.disableBackground || false;
    const controls = props.controls;
    const onClose = props.onClose || ModalAPI.close;
    const onBackground = props.onBackground || onClose;
    const Body = props.body || <></>;


    const renderTitle = (title, attrs) => {
        if( !title ) return <></>;

        return (
            <Styles.Caption>
                {title}

                {
                    attrs.renderClose &&
                    (<Styles.CloseButton onClick={onClose} />)
                }   
            </Styles.Caption>
        );
    };

    const renderControlButton = (ctrl) => {
        if( !ctrl ) return <></>;

        return (
            <Styles.ControlButton
                key={"prompt-control-button-" + getKey()}
                onClick={ctrl.onClick}
            >
                {ctrl.caption}
            </Styles.ControlButton>
        );
    };

    const renderControls = (ctrls) => {
        if( !ctrls ) return <></>;

        return (
            <Styles.ControlContainer>
                {
                    ctrls.map((ctrl) => {
                        return renderControlButton(ctrl);
                    })
                }
            </Styles.ControlContainer>
        );
    };

    return (
        <Styles.Content>
            {
                !disableBackground &&
                (<Styles.Background onClick={onBackground} />)
            }

            <Styles.View>
                {renderTitle(title, { renderClose: !disableClose })}

                <Styles.BodyContainer
                    style={!controls ? {
                        width: "100%",
                        height: `calc(100% - ${Styles.dimensions.Caption.height})`
                    }: {}}
                >
                    {Body}
                </Styles.BodyContainer>

                {renderControls(controls)}
            </Styles.View>
        </Styles.Content>
    );
}
