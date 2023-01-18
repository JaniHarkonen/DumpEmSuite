import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
    
    font-weight: bold;
    padding-left: 4px;

    &:hover {
        cursor: pointer;
        background-color: ${UIstyle.colorScheme.light.backgroundDistant};
    }
`;

const CaptionPanel = styled.div`
    position: relative;
    height: calc(100% - 2px);

    display: inline-block;
    vertical-align: top;
`;

const CaptionContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;

    align-items: center;
    padding-left: 4px;

    font-size: 14px;
`;

const IconPanel = styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    aspect-ratio: 1 / 1;
`;

const IconAligner = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const IconContainer = styled.div`
    position: relative;
    width: 85%;
    height: 85%;
`;

export const light = {
    Content,
    CaptionPanel,
    CaptionContainer,
    IconPanel,
    IconAligner,
    IconContainer
};
