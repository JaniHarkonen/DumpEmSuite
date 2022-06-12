import Prompt from "./Prompt";
import ModalAPI from "../../../apis/ModalAPI";

export default function MessagePrompt(props) {
    const message = props.message;
    const onOk = props.onOk || ModalAPI.close;
    const captionOk = props.captionOk || "OK";


    const createForm = () => {
        return {
            body: <>{message}</>,
            controls: [
                {
                    caption: captionOk,
                    onClick: onOk
                }
            ]
        };
    };

    return(
        <Prompt
            {...{
                    ...props,
                    ...createForm()
                }
            }
        />
    );
};
