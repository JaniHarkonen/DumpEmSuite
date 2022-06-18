import BinaryPrompt from "./generic/BinaryPrompt";

export default function ClearTabPrompt(props) {
    return (
        <BinaryPrompt
            title="Before clearing..."
            message="Are you sure you want to remove all of the stocks from the tab?"
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
