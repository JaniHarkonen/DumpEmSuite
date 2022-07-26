import styled from "styled-components";

const BodyWrapper = styled.div`
    position: relative;
    width: calc(100% - 5px);
    height: calc(100% - 7px);

    overflow-y: auto;
`;

const FilePickerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 64px;
`;

const SaveButton = styled.div`
    position: relative;
    width: 64px;
    height: 32px;

    background-color: black;
    color: white;
    font-weight: bold;
`;

const SaveButtonContainer = styled.div`
    position: absolute;
    left: calc(100% - 113px);
    width: 108px;
    bottom: 5px;
`;

export const Styles = {
    BodyWrapper,
    FilePickerContainer,
    SaveButton,
    SaveButtonContainer
};
