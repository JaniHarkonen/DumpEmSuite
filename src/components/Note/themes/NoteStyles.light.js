import styled from "styled-components";

const NoteInput = styled.textarea`
    position: relative;
    left: 0px;
    top: 0px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border: none;
    outline: none;
    resize: none;

    border-radius: 8px;
`;

const NoteInputColors = {
    default: "#FFF9E8",
    unsaved: "#FFF980"
};

export const light = {
    NoteInput,
    NoteInputColors
};
