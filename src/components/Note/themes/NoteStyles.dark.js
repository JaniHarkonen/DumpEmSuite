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
    color: #D8D8D8;
`;

const NoteInputColors = {
    default: "#003D63",
    unsaved: "#004E7F"
};

export const dark = {
    NoteInput,
    NoteInputColors
};
