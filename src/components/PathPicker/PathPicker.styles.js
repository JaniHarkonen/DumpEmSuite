import styled from "styled-components";

const HalfDiv = styled.div`
    position: relative;
    width: 100%;
    heigth: 50%;
`;

const FileInput = styled.input`
    position: relative;
    heigth: 100%;
`;

const FileLoadButtonContainer = styled.div`
    position: relative;
    display: inline-block;
    height: 25%;
`;

export const Styles = {
    HalfDiv: HalfDiv,
    FileInput: FileInput,
    FileLoadButtonContainer: FileLoadButtonContainer
};
