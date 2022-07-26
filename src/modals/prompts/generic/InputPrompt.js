import Prompt from "./Prompt";
import ModalAPI from "../../../apis/ModalAPI";
import useInputField from "../../../hooks/useInputField";

import { Styles } from "./Prompt.styles";


export default function InputPrompt(props) {
    const inputCaption = props.inputCaption || "";
    const defaultInput = props.defaultInput || "";
    const disableCloseOnDone = props.disableCloseOnDone;
    const onDone = props.onDone;

    const [input, handleInputChange] = useInputField(defaultInput);


    const createForm = () => {
        return {
            body: (
                <>
                    <Styles.InputPromptCaptionContainer>{inputCaption}</Styles.InputPromptCaptionContainer>
                    <Styles.InputPromptInputContainer>
                        <Styles.InputPromptInput
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Styles.InputPromptInputContainer>
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
