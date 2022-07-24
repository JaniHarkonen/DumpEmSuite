import styled from "styled-components";
import { UIstyle } from "./assets/assets";

const Base = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    min-width: 708px;
    height: 100%;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    overflow-x: hidden;
    overflow-y: hidden;
`;

const ContentContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const WorkspaceContainer = styled.div`
    position: absolute;

    left: 48px;
    width: calc(100% - 48px);
    height: 100%;
`;

const TopBar = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    background-color: ${UIstyle.colorScheme.background};

    border-bottom-style: ${UIstyle.majorBorder.style};
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.color};
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`;

const Tab_highlightStyle = {
    backgroundColor: "#FFFBEF",
    borderStyle: "dashed",
    fontWeight: "bold",
    fontSize: "15px",
    top: "0px"
};

const Tab = styled.div`
    position: relative;
    display : inline-block;
    top: 1px;

    width: 128px;
    height: 30px;

    background-color: #FFEE9B;

    border-style: solid;
    border-color: #FFDA75;
    border-top-left-radius: 12px;

    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 1px;
    border-bottom-width: 0px;

    &:hover {
        background-color: #FFF4D6;
    }
`;

const TabCloseButton = styled.div`
    position: absolute;
    right: -1px;
    top: -1px;
    height: 50%;
    aspect-ratio: 1 / 1;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`;

const TabContentWrapper = styled.div`
    position: relative;
    display: flex;
    width: calc(100% - 16px);
    height: calc(100% - 2px);

    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

const SideBarContainer = styled.div`
    position: absolute;
    left: 0px;
    width: 48px;
    height: 100%;
`;


export const Styles = {
    Base,
    ContentContainer,
    WorkspaceContainer,
    TopBar,
    Tab,
    TabCloseButton,
    TabContentWrapper,
    Content,
    SideBarContainer,

    Tab_highlightStyle
};
