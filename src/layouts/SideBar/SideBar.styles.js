import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    background-color: yellow;
`;

const OptionContainer = styled.div`
    position: relative;
    width: 90%;
    height: 100%;
`;

const OptionPanelContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: 1em;
`;

export const Styles = {
    Content: Content,
    OptionContainer: OptionContainer,
    OptionPanelContainer: OptionPanelContainer
};
