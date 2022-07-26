import styled from "styled-components";
import { UIstyle } from "../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: ${UIstyle.majorBorder.width};
    top: 0px;
    width: calc(100% - calc(${UIstyle.majorBorder.width} * 2));
    height: calc(100% - ${UIstyle.majorBorder.width} - 1px);

    border-right-style: solid;
    border-right-width: ${UIstyle.majorBorder.width};
    border-right-color: ${UIstyle.majorBorder.color};

    border-bottom-style: solid;
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.color};

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

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${UIstyle.colorScheme.backgroundDistant};

    border-bottom-style: solid;
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.color};
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

export const Styles = {
    Content,
    CaptionBar,
    CaptionAligner,
    FileExplorerContainer
};
