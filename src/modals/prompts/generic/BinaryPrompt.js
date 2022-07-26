import Prompt from "./Prompt";
import ModalAPI from "../../../apis/ModalAPI";


export default function MessagePrompt(props) {
    const message = props.message;
    const choices = props.choices;
    const disableCloseOnSelection = props.disableCloseOnSelection ;


    const handleChoiceClick = (onClick) => {
        if( !onClick )
        {
            ModalAPI.close();
            return;
        }

        onClick();

        if( !disableCloseOnSelection ) ModalAPI.close();
    };

    const createForm = () => {
        return {
            body: <>{message}</>,
            controls: [
                {
                    caption: choices.negative.caption,
                    onClick: () => {
                        handleChoiceClick(choices.negative.onClick);
                    }
                },
                {
                    caption: choices.positive.caption,
                    onClick: () => {
                        handleChoiceClick(choices.positive.onClick);
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
