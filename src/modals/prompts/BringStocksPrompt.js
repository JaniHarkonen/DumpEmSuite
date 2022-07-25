import BinaryPrompt from "./generic/BinaryPrompt";

import { formatStringToHTML } from "./generic/Prompt.js";

export default function ClearTabPrompt(props) {
    return (
        <BinaryPrompt
            title="Before bringing..."
            message={formatStringToHTML("Some of the stocks on this tab are color coded and have to be cleared before bringing!\n\nWould you like to clear the tab?")}
            choices={{
                negative: {
                    caption: "No"
                },
                positive: {
                    caption: "Yes",
                    onClick: props.onYes
                }
            }}
        />
    );
}
