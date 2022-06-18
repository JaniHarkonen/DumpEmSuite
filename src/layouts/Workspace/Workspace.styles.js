import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;
`;

const TabBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    background-color: orange;
`;

const WSTab = styled.div`
    position: relative;
    display: inline-block;
    width: 128px;
    height: 100%;
    margin-right: 4px;

    background-color: gray;
`;

const ViewContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

export const Styles = {
    Content: Content,
    TabBarContainer: TabBarContainer,
    WSTab: WSTab,
    ViewContainer: ViewContainer
};
