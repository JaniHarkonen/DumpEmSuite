import styled from "styled-components";

const FileContainer = styled.div`
    position: relative;
    width : 50%;
    height: 48px;
`;

const FileCloseButton = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 16px;
    height: 16px;

    background-color: black;
`;

export const Styles = {
    FileContainer: FileContainer,
    FileCloseButton: FileCloseButton
};
