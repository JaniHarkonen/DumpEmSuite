import styled from "styled-components";
import ModalAPI from "../../../apis/ModalAPI";
import { getKey } from "../../../utils/KeyManager";

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

        return(
            <Caption>
                {title}

                {
                    attrs.renderClose &&
                    (<CloseButton onClick={onClose} />)
                }   
            </Caption>
        );
    };

    const renderControlButton = (ctrl) => {
        if( !ctrl ) return <></>;

        return(
            <ControlButton
                key={"prompt-control-button-" + getKey()}
                onClick={ctrl.onClick}
            >
                {ctrl.caption}
            </ControlButton>
        );
    };

    const renderControls = (ctrls) => {
        if( !ctrls ) return <></>;

        return(
            <ControlContainer>
                {
                    ctrls.map((ctrl) => {
                        return renderControlButton(ctrl);
                    })
                }
            </ControlContainer>
        );
    };

    return(
        <Content>
            {
                !disableBackground &&
                (<Background onClick={onBackground} />)
            }

            <View>
                {renderTitle(title, { renderClose: !disableClose })}

                <BodyContainer>
                    {Body}
                </BodyContainer>

                {renderControls(controls)}
            </View>
        </Content>
    );
};

const Content = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 100;

    background-color: rgba(255, 255, 255, 0.5);
`;

const Background = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const View = styled.div`
    position: relative;

    width: 45%;
    height: 33%;

    background-color: white;
    border-style: solid;
    border-width: 2px;
`;

const Caption = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 32px;

    border-bottom-style: solid;
`;

const BodyContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 92px);
    overflow-y: hidden;
`;

const ControlContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    display: flex;
    justify-content: center;
    gap: 1em;

    background-color: red;
`;

const CloseButton = styled.div`
    position: absolute;
    right: 0px;
    width: 32px;
    height: 100%;

    background-color: black;
`;

const ControlButton = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 56px;

    background-color: black;
    color: white;
    font-weight: bold;
`;
