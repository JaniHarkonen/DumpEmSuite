import { useEffect } from "react";
import useStateRef from "react-usestateref";
import styled from "styled-components";
import { FullDiv } from "../../common/FullDiv";


export default function Note(props) {
    const content = props.content;
    const updateContent = props.updateContent || function(updatedText){ };

    const [text, setText, textRef] = useStateRef(content);
    const [contentHasChanged, setContentHasChanged, contentHasChangedRef] = useStateRef(false);


    useEffect(() => {
        document.addEventListener("keydown", handleKeyboardShortcuts);
        setText(content);

        return () => {
            document.removeEventListener("keydown", handleKeyboardShortcuts);
        };
    }, [content]);

    const handleTextInput = (e) => {
        setText(e.target.value);
        setContentHasChanged(true);
    };

    const handleKeyboardShortcuts = (e) => {
        if( e.ctrlKey )
        {
            if( e.key === "s" )
            {
                if( contentHasChangedRef.current === true )
                {
                    updateContent(textRef.current);
                    setContentHasChanged(false);
                }
            }
        }
    };

    return (
        <FullDiv>
            <NoteInput
                id=""
                style={{
                    fontFamily: "Courier New",
                    fontSize: "14px",
                    backgroundColor: (contentHasChanged) ? "#FFF980" : "#FFF9E8",
                    tabSize: 4
                }}
                value={text}
                onChange={handleTextInput}
            />
        </FullDiv>
    );
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
