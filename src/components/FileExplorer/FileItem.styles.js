import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const RemoveButton = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 16px;
    height: 16px;

    opacity: 0.5;

    &:hover {
        cursor: pointer;
        opacity: 1.0;
    }
`;

const IconPanel = styled.div`
    position: relative;
    width: 100%;
    height: 75%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const IconContainer = styled.div`
    position: relative;
    width: 50%;
    height: 50%;
`;

const TitlePanel = styled.div`
    position: relative;
    width: 100%;
    height: 25%;

    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;

    overflow-x: hidden;
    overflow-y: hidden;
`;

export const Styles = {
    Content,
    RemoveButton,
    IconPanel,
    IconContainer,
    TitlePanel
};
