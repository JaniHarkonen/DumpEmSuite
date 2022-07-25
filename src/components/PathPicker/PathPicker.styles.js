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
    margin-left: 5px;
    width: 98px;
    height: 24px;

    display: inline-block;
    vertical-align: top;
`;

export const Styles = {
    HalfDiv,
    FileInput,
    FileLoadButtonContainer
};
