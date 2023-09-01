import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    border-style: solid;
    border-width: 1px;
    border-radius: 0px;

    &:hover {
        cursor: pointer;
        background-color: ${UIstyle.colorScheme.dark.distinct}
    }
`;

const LoadFileIconPanel = styled.div`
    position: relative;
    height: 100%;
    aspect-ratio: 1 / 1;

    display: inline-block;
`;

const LoadIconContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadIconAligner = styled.div`
    position: relative;
    height: 80%;
    aspect-ratio: 1 / 1;
`;

const LoadFileCaptionPanel = styled.div`
    position: relative;
    width: 75%;
    height: 100%;

    display: inline-block;
    vertical-align: top;    // This line prevents the div within (shown below) from "falling" when text is added
`;

const LoadFileButtonCaptionContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    padding-left: 5px;

    display: flex;
    align-items: center;
`;

const LoadFileInput = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

export const dark = {
    Content,
    LoadFileIconPanel,
    LoadIconContainer,
    LoadIconAligner,
    LoadFileCaptionPanel,
    LoadFileButtonCaptionContainer,
    LoadFileInput
};
