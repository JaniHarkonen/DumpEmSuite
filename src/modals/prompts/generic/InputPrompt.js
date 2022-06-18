import { useState } from "react";
import Prompt from "./Prompt";
import ModalAPI from "../../../apis/ModalAPI";

export default function InputPrompt(props) {
    const inputCaption = props.inputCaption || "";
    const defaultInput = props.defaultInput || "";
    const disableCloseOnDone = props.disableCloseOnDone;
    const onDone = props.onDone;

    const [input, setInput] = useState(defaultInput);


    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const createForm = () => {
        return {
            body: (
                <>
                    {inputCaption}

                    <br />

                    <input
                        value={input}
                        onChange={handleInputChange}
                    />
                </>
            ),
            controls: [
                {
                    caption: "Cancel",
                    onClick: ModalAPI.close
                },
                {
                    caption: "Done",
                    onClick: () => {
                        onDone(input);

                        if( !disableCloseOnDone )
                        ModalAPI.close();
                    }
                }
            ]
        };
    };

    return (
        <Prompt
            {...{
                    ...props,
                    ...createForm()
                }
            }
        />
    );
}
