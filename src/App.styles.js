import styled from "styled-components";

const Base = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

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

    background-color: red;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`;

const Tab = styled.div`
    position: relative;
    display : inline-block;

    width : 128px;
    height: 32px;
    margin-right: 4px;

    background-color: green;
`;

const TabCloseButton = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    aspect-ratio: 1 / 1;

    background-color: #B70000;
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
    Content,
    SideBarContainer
};
