import styled from "styled-components";

const dimensions = {
    Caption: {
        height: "32px"
    },
    ControlContainer: {
        height: "32px"
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
    height: ${dimensions.Caption.height};

    border-bottom-style: solid;
`;

const BodyContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - calc(${dimensions.Caption.height} + ${dimensions.ControlContainer.height} + 3px));
    overflow-y: hidden;
`;

const ControlContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${dimensions.ControlContainer.height};

    display: flex;
    justify-content: center;
    gap: 1em;
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

export const Styles = {
    Content: Content,
    Background: Background,
    View: View,
    Caption: Caption,
    BodyContainer: BodyContainer,
    ControlContainer: ControlContainer,
    CloseButton: CloseButton,
    ControlButton: ControlButton,
    
    dimensions: dimensions
};
