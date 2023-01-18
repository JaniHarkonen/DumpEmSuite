import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - ${UIstyle.majorBorder.width});
    height: 100%;

    display: flex;
    justify-content: center;
    background-color: ${UIstyle.colorScheme.dark.background};

    border-right-style: ${UIstyle.majorBorder.style};
    border-right-width: ${UIstyle.majorBorder.width};
    border-right-color: ${UIstyle.majorBorder.dark.color};
`;

const OptionContainer = styled.div`
    position: relative;
    width: 90%;
    height: 100%;
`;

const OptionPanelContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 1/1;
    margin-bottom: 1em;
`;

const ImageButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 80%;

    &:hover {
        cursor: pointer;
        width: 90%;
        height: 90%;
    }
`;

export const dark = {
    Content,
    OptionContainer,
    OptionPanelContainer,
    ImageButtonContainer
};
