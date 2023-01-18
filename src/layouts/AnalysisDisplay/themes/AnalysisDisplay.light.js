import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: ${UIstyle.majorBorder.width};
    top: 0px;
    width: 100%;
    min-width: 350px;
    height: 100%;

    @media (min-width: 1460px) {
        width: 120%;
    }

    @media (min-width: 1600px) {
        width: 140%;
    }
`;

const TopBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 24px;
`;

const AnalysisTabButton = styled.div`
    position: relative;
    top: -1px;
    width: 112px;
    height: 100%;

    display: inline-block;
    vertical-align: top;

    background-color: #FFEFA8;

    border-top-left-radius: 12px;
    border-top-right-radius: 4px;

    border-style: solid;
    border-color: #FFD800;

    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 1px;
    border-bottom-width: 0px;

    &:hover {
        cursor: pointer;
    }
`;

const TabButtonContentAligner = styled.div`
    position: relative;
    height: calc(100% - 2px);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoteContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 22px);
`;

const TabBarColor = {
    active: "#FFF9E8"
};

export const light = {
    Content,
    TopBarContainer,
    AnalysisTabButton,
    TabButtonContentAligner,
    NoteContainer,
    TabBarColor
};
