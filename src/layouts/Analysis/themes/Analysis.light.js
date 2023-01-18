import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: ${UIstyle.majorBorder.width};
    top: 0px;
    width: calc(100% - calc(${UIstyle.majorBorder.width} * 2));
    height: calc(100% - ${UIstyle.majorBorder.width} - 1px);

    border-right-style: solid;
    border-right-width: ${UIstyle.majorBorder.width};
    border-right-color: ${UIstyle.majorBorder.light.color};

    border-bottom-style: solid;
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.light.color};

    @media (min-width: 1460px) {
        width: 120%;
    }

    @media (min-width: 1600px) {
        width: 140%;
    }
`;

const CaptionBar = styled.div`
    position: relative;
    width: 100%;
    height: 24px;

    background-color: ${UIstyle.colorScheme.light.backgroundDistant};

    border-bottom-style: solid;
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.light.color};
`;

const CaptionAligner = styled.div`
    position: relative;
    height: calc(100% - 2px);
`;

const FileExplorerContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 24px);
`;

const MaterialTab = styled.div`
    position: relative;
    display: inline-block;
    width: 128px;
    height: calc(100% + ${UIstyle.majorBorder.width});

    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: ${UIstyle.majorBorder.dark.color};

    padding-left: 5px;

    &:hover {
        cursor: pointer;
    }
`;

const tabHighlightColor = UIstyle.colorScheme.light.background;

export const light = {
    Content,
    CaptionBar,
    CaptionAligner,
    FileExplorerContainer,
    MaterialTab,
    tabHighlightColor
};
