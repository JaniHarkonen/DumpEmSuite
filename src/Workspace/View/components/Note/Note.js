import React from "react";
import styled from "styled-components";
import { Content } from "../../../../common/Content";

export default function Note(props) {

    return(
        <Content>
            <NoteInput
                style={{
                    fontFamily: "Courier New",
                    fontSize: "14px",
                    backgroundColor: "#FFF9E8",
                    tabSize: 4
                }}
            />
        </Content>
    )
}

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