import useStateRef from "react-usestateref";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { FullDiv } from "../../common/FullDiv";
import { Styles } from "./Note.styles";
import "fixedsys-css/css/fixedsys.css";


export default function Note(props) {
    const content = props.content;
    const updateContent = props.updateContent || function(updatedText){ };
    const tabSize = 4;
    const textareaREF = useRef();

    const [text, setText, textRef] = useStateRef(content);
    const [cursorPosition, setCursorPosition, cursorPositionREF] = useStateRef(-1);
    const [contentHasChanged, setContentHasChanged, contentHasChangedRef] = useStateRef(false);


    useLayoutEffect(() => {
        document.addEventListener("keydown", handleKeyboardShortcuts);

        if( textareaREF.current && cursorPositionREF.current >= 0 )
        textareaREF.current.selectionStart = textareaREF.current.selectionEnd = cursorPositionREF.current;

        return () => {
            document.removeEventListener("keydown", handleKeyboardShortcuts);
        };
    }, [content, textRef, cursorPositionREF.current]);

    const handleTextInput = (e) => {
        e.stopPropagation();

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

                    return;
                }
            }
        }

        if( e.key === "Tab" )
        {
            e.preventDefault();

            const textarea = e.target;
            const currentText = textarea.value;
            const newText = currentText.substring(0, textarea.selectionStart) + 
                             "\t" +
                             currentText.substring(textarea.selectionEnd);
            const start = textarea.selectionStart;
            setCursorPosition(start + "\t".length);
            setText(newText);
            setContentHasChanged(true);
        }
    };

    return (
        <FullDiv>
            <Styles.NoteInput
                //className="fixedsys-default"
                id="note-textarea"
                style={{
                    fontFamily: "Courier New",
                    fontSize: "14px",
                    backgroundColor: (contentHasChanged) ? "#FFF980" : "#FFF9E8",
                    tabSize: tabSize
                }}
                value={text || ""}
                onChange={handleTextInput}
                ref={textareaREF}
                spellCheck={false}
            />
        </FullDiv>
    );
}
