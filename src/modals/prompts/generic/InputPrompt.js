import Prompt from "./Prompt";
import ModalAPI from "../../../apis/ModalAPI";
import useInputField from "../../../hooks/useInputField";

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
