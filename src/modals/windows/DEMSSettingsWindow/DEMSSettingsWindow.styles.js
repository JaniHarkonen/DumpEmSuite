import styled from "styled-components";

const BodyWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    overflow-y: scroll;
`;

const FilePickerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 33%;
`;

const SaveButton = styled.div`
    position: relative;
    width: 64px;
    height: 32px;

    background-color: black;
    color: white;
    font-weight: bold;
`;

export const Styles = {
    BodyWrapper: BodyWrapper,
    FilePickerContainer: FilePickerContainer,
    SaveButton: SaveButton
};
