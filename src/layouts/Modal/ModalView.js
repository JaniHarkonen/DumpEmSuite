import React from "react";
import styled from "styled-components";
import { getKey } from "../../utils/KeyManager";


export default function ModalView(props) {
    const mode = props.mode || "ok"
    const caption = props.caption || "castur duxille";
    const message = props.message || "No message";
    const hooks = props.hooks;
    const disableClose = props.disableClose || false;
    const disableBackground = props.disableBackground || false;

    const NotificationButtons = 
        <ButtonContainer>
            <InputButton onClick={hooks.onOk || hooks.onClose}>
                OK
            </InputButton>
        </ButtonContainer>
    ;

    const QuestionButtons = 
        <ButtonContainer>
            <InputButton onClick={hooks.onYes}>
                Yes
            </InputButton>

            <InputButton onClick={hooks.onNo || hooks.onClose}>
                No
            </InputButton>
        </ButtonContainer>
    ;

    const buttonLayouts = {
        ok: NotificationButtons,
        question: QuestionButtons
    };

    const formatNewlines = (text) => {
        if( !text ) return "";

        const split = text.split("\n");
        const output = [];

        for(let part of split)
        {
            output.push(
                <p key={"modal-message-fragment-" + getKey()}>
                    {part} <br />
                </p>
            );
        }

        return output;
    };

    return(
        <Content>
            {
                !disableBackground &&
                (<Background onClick={hooks.onBackground || hooks.onClose} />)
            }

            <View>
                <Caption>
                    {caption}

                    {
                        !disableClose &&
                        (<CloseButton onClick={hooks.onClose} />)
                }   
                </Caption>

                <Message>
                    {formatNewlines(message)}
                </Message>

                {buttonLayouts[mode]}
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

const Message = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 92px);
    overflow-y: hidden;
`;

const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    width: 100%;
    height: 56px;
`;

const InputButton = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 56px;

    background-color: black;
    color: white;
    font-weight: bold;
`;

const CloseButton = styled.div`
    position: absolute;
    right: 0px;
    width: 32px;
    height: 100%;

    background-color: black;
`;