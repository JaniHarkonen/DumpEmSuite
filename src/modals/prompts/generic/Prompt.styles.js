import styled from "styled-components";

const dimensions = {
    Caption: {
        height: "24px"
    },
    ControlContainer: {
        height: "56px"
    }
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
    width: 360px;
    min-width: 360px;
    height: 240px;

    background-color: white;
    border-style: solid;
    border-width: 2px;
`;

const Caption = styled.div`
    position: relative;
    width: 100%;
    height: ${dimensions.Caption.height};

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-style: solid;
    border-bottom-width: 2px;
`;

const BodyContainer = styled.div`
    position: relative;
    left: 5px;
    top: 5px;
    width: calc(100% - 10px);
    height: calc(100% - calc(${dimensions.Caption.height} + ${dimensions.ControlContainer.height} + 3px));

    overflow-y: hidden;
    text-align: justify;
`;

const ControlContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${dimensions.ControlContainer.height};

    display: flex;
    justify-content: center;
    gap: 5em;
`;

const CloseButton = styled.div`
    position: absolute;
    top: -1px;
    right: -1px;
    width: 32px;
    height: calc(100% + 1px);

    &:hover {
        cursor: pointer;
    }
`;

const ControlButton = styled.div`
    position: relative;
    min-width: 90px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: black;
    color: white;
    font-weight: bold;

    border-radius: 6px;

    &:hover {
        cursor: pointer;
        opacity: 0.65;
    }
`;

const InputPromptCaptionContainer = styled.div`
    position: relative;
    width: 100%;
    height: 25%;
`;

const InputPromptInputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 24px;
`;

const InputPromptInput = styled.input`
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: 100%;

    padding: 0;
    margin: 0;
`;

export const Styles = {
    Content,
    Background,
    View,
    Caption,
    BodyContainer,
    ControlContainer,
    CloseButton,
    ControlButton,

    InputPromptCaptionContainer,
    InputPromptInputContainer,
    InputPromptInput,
    
    dimensions
};
