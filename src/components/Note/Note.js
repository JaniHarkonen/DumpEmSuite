import { useEffect } from "react";
import useStateRef from "react-usestateref";
import { FullDiv } from "../../common/FullDiv";
import { Styles } from "./Note.styles";
import "fixedsys-css/css/fixedsys.css";


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
                }
            }
        }
    };

    return (
        <FullDiv>
            <Styles.NoteInput
                //className="fixedsys-default"
                //id=""
                style={{
                    fontFamily: "Courier New",
                    fontSize: "14px",
                    backgroundColor: (contentHasChanged) ? "#FFF980" : "#FFF9E8",
                    tabSize: 4
                }}
                value={text || ""}
                onChange={handleTextInput}
            />
        </FullDiv>
    );
}
